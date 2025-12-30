import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useDocumentTitle } from '@/hooks';

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuccess = location.pathname === '/checkout/success';
  
  useDocumentTitle(isSuccess ? 'Thanh toán thành công | ECOFIT' : 'Thanh toán thất bại | ECOFIT');

  return (
    <div className="checkout-success">
      <div className="checkout-success-header">
        {isSuccess ? (
          <>
            <CheckCircleOutlined className="success-icon" />
            <h2>Thanh toán thành công!</h2>
            <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn sẽ được xử lý trong thời gian sớm nhất.</p>
          </>
        ) : (
          <>
            <CloseCircleOutlined className="error-icon" />
            <h2>Thanh toán thất bại</h2>
            <p>Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.</p>
          </>
        )}
      </div>
      <div className="checkout-success-action">
        <button
          className="button"
          onClick={() => navigate('/')}
          type="button"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
};

export default PaymentResult; 