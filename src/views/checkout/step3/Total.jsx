import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { useFormikContext } from 'formik';
import { formatVND } from '@/helpers/utils';
import PropType from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';
import { createPayment } from '@/services/payos';
import { displayActionMessage } from '@/helpers/utils';

const Total = ({ isInternational, subtotal }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const basket = useSelector(state => state.basket);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest })); // save payment details
    history.push(CHECKOUT_STEP_2);
  };

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      // Generate a numeric order code within safe range
      const orderCode = Math.floor(Date.now() % 1000000000); // Use last 9 digits to stay well within limit
      const totalAmount = Math.round(subtotal + (isInternational ? 50000 : 0));

      // Ensure each item has valid price and quantity
      const validatedItems = basket.map(item => ({
        name: String(item.name || ''),
        quantity: Math.max(1, item.quantity || 1), // Ensure minimum quantity of 1
        price: Math.round(item.price || 0) // Ensure price is a whole number
      }));

      // Get shipping details from form values and ensure they are strings
      const { fullname = '', email = '', address = '', mobile = {} } = values || {};
      const phoneValue = mobile?.value || '';

      const paymentResult = await createPayment({
        orderCode,
        amount: totalAmount,
        description: `DH${orderCode}`, // Short description within 25 chars
        buyerName: String(fullname),
        buyerEmail: String(email),
        buyerPhone: String(phoneValue),
        buyerAddress: String(address),
        items: validatedItems,
        expiredAt: Math.floor(Date.now() / 1000) + 3600 // 1 hour from now
      });

      if (paymentResult?.success && paymentResult?.checkoutUrl) {
        displayActionMessage('Đang chuyển đến trang thanh toán...', 'info');
        
        // Create a form and submit it to navigate to PayOS
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = paymentResult.checkoutUrl;
        form.target = '_self';
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Không nhận được thông tin thanh toán');
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (isMounted.current) {
        let errorMessage = 'Lỗi không xác định';
        
        // Handle different types of errors
        if (typeof error === 'string') {
          errorMessage = error;
        } else if (error instanceof Error) {
          errorMessage = error.message || 'Lỗi không xác định';
        } else if (error && typeof error === 'object') {
          errorMessage = error.desc || error.message || JSON.stringify(error);
        }
        
        displayActionMessage(`Có lỗi xảy ra khi tạo thanh toán: ${errorMessage}`, 'error');
      }
    } finally {
      if (isMounted.current) {
        setIsProcessing(false);
      }
    }
  };

  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Tổng tiền:</p>
        <h2 className="basket-total-amount">
          {formatVND(subtotal + (isInternational ? 50000 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={() => onClickBack(values)}
          type="button"
          disabled={isProcessing}
        >
          <ArrowLeftOutlined />
          &nbsp;
          Quay lại
        </button>
        <button
          className="button"
          disabled={isProcessing}
          onClick={handlePayment}
          type="button"
        >
          {isProcessing ? (
            <>
              <LoadingOutlined />
              &nbsp;
              Đang xử lý...
            </>
          ) : (
            <>
              <CheckOutlined />
              &nbsp;
              Thanh toán với PayOS
            </>
          )}
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropType.bool.isRequired,
  subtotal: PropType.number.isRequired
};

export default Total;
