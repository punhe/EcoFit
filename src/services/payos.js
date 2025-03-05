const PAYOS_CLIENT_ID = import.meta.env.VITE_PAYOS_CLIENT_ID;
const PAYOS_API_KEY = import.meta.env.VITE_PAYOS_API_KEY;
const PAYOS_CHECKSUM_KEY = import.meta.env.VITE_PAYOS_CHECKSUM_KEY;

// Function to convert string to hex
const stringToHex = (str) => {
  return Array.from(str)
    .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join('');
};

// Function to generate signature
const generateSignature = async (data) => {
  try {
    const signData = {
      amount: data.amount,
      cancelUrl: data.cancelUrl,
      description: data.description,
      orderCode: data.orderCode,
      returnUrl: data.returnUrl
    };
    
    // Sort keys alphabetically and create query string
    const sortedKeys = Object.keys(signData).sort();
    const signString = sortedKeys.map(key => `${key}=${signData[key]}`).join('&');
    
    // Convert strings to Uint8Array
    const encoder = new TextEncoder();
    const message = encoder.encode(signString);
    const key = encoder.encode(PAYOS_CHECKSUM_KEY);
    
    // Import key for HMAC
    const cryptoKey = await window.crypto.subtle.importKey(
      'raw',
      key,
      {
        name: 'HMAC',
        hash: { name: 'SHA-256' }
      },
      false,
      ['sign']
    );
    
    // Generate signature
    const signature = await window.crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      message
    );
    
    // Convert to hex string
    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  } catch (error) {
    console.error('Error generating signature:', error);
    throw new Error('Không thể tạo chữ ký');
  }
};

export const createPayment = async (orderInfo) => {
  try {
    // Validate required fields
    if (!orderInfo.orderCode || !orderInfo.amount || !orderInfo.items) {
      throw new Error('Thiếu thông tin đơn hàng');
    }

    // Validate items
    if (!Array.isArray(orderInfo.items) || orderInfo.items.length === 0) {
      throw new Error('Đơn hàng phải có ít nhất một sản phẩm');
    }

    // Ensure orderCode is a number and within valid range
    const orderCode = Number(orderInfo.orderCode);
    if (isNaN(orderCode) || orderCode <= 0 || orderCode > 9007199254740991) {
      throw new Error('Mã đơn hàng không hợp lệ');
    }

    // Ensure description is within length limit
    const description = String(orderInfo.description).slice(0, 25);

    const paymentData = {
      orderCode,
      amount: orderInfo.amount,
      description,
      buyerName: orderInfo.buyerName,
      buyerEmail: orderInfo.buyerEmail,
      buyerPhone: orderInfo.buyerPhone,
      buyerAddress: orderInfo.buyerAddress,
      items: orderInfo.items,
      cancelUrl: `${window.location.origin}/checkout/cancel`,
      returnUrl: `${window.location.origin}/checkout/success`,
      expiredAt: orderInfo.expiredAt
    };

    // Generate signature
    paymentData.signature = await generateSignature(paymentData);

    console.log('Payment Request:', paymentData);

    const response = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': PAYOS_CLIENT_ID,
        'x-api-key': PAYOS_API_KEY
      },
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();
    console.log('PayOS Response:', data);
    
    if (!response.ok) {
      console.error('PayOS API Error:', data);
      throw new Error(data.desc || 'Lỗi khi tạo thanh toán');
    }
    
    if (data.code === '00' && data.data?.checkoutUrl) {
      return {
        success: true,
        checkoutUrl: data.data.checkoutUrl
      };
    } else {
      throw new Error(data.desc || 'Không nhận được URL thanh toán');
    }
  } catch (error) {
    console.error('Payment creation failed:', error);
    throw error;
  }
}; 