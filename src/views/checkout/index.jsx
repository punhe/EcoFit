import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomInput } from '@/components/formik';
import { BasketItem } from '@/components/basket';
import { createPayment } from '@/services/payos';
import { displayActionMessage, calculateTotal, formatVND } from '@/helpers/utils';

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required('Vui lòng nhập họ tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  address: Yup.string()
    .required('Vui lòng nhập địa chỉ'),
  mobile: Yup.object()
    .shape({
      value: Yup.string()
        .required('Vui lòng nhập số điện thoại')
        .matches(/^[0-9]{10}$/, 'Số điện thoại không hợp lệ')
    })
});

const Checkout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const navigate = useNavigate();
  const { basket, profile } = useSelector((state) => ({
    basket: state.basket,
    profile: state.profile
  }));

  const initFormikValues = {
    fullname: profile.fullname || '',
    email: profile.email || '',
    address: profile.address || '',
    mobile: profile.mobile || { value: '' }
  };

  const subtotal = calculateTotal(basket.map((product) => product.price * product.quantity));

  const onBack = () => {
    navigate('/');
  };

  const handleSubmit = async (values) => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const orderCode = Math.floor(Date.now() % 1000000000);
      const totalAmount = Math.round(subtotal + (isInternational ? 50000 : 0));

      const validatedItems = basket.map(item => ({
        name: String(item.name || ''),
        quantity: Math.max(1, item.quantity || 1),
        price: Math.round(item.price || 0)
      }));

      const paymentResult = await createPayment({
        orderCode,
        amount: totalAmount,
        description: `DH${orderCode}`,
        buyerName: String(values.fullname),
        buyerEmail: String(values.email),
        buyerPhone: String(values.mobile.value),
        buyerAddress: String(values.address),
        items: validatedItems,
        expiredAt: Math.floor(Date.now() / 1000) + 3600
      });

      if (paymentResult?.success && paymentResult?.checkoutUrl) {
        displayActionMessage('Đang chuyển đến trang thanh toán...', 'info');
        
        localStorage.setItem('pendingOrder', JSON.stringify({
          orderCode,
          amount: totalAmount,
          items: validatedItems,
          shipping: {
            isInternational,
            ...values
          }
        }));

        window.location.href = paymentResult.checkoutUrl;
      } else {
        throw new Error('Không nhận được thông tin thanh toán');
      }
    } catch (error) {
      console.error('Payment error:', error);
      let errorMessage = 'Lỗi không xác định';
      
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (error && typeof error === 'object') {
        errorMessage = error.desc || error.message || JSON.stringify(error);
      }
      
      displayActionMessage(`Có lỗi xảy ra khi tạo thanh toán: ${errorMessage}`, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!basket || basket.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="checkout">
      <div className="checkout-step-1">
        <h3 className="text-center">Thông tin đơn hàng</h3>
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              key={product.id}
              product={product}
              basket={basket}
            />
          ))}
        </div>

        <div className="checkout-form">
          <Formik
            initialValues={initFormikValues}
            validationSchema={FormSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <div className="checkout-field">
                  <Field
                    name="fullname"
                    type="text"
                    label="* Họ tên"
                    placeholder="Nhập họ tên"
                    component={CustomInput}
                  />
                </div>
                <div className="checkout-field">
                  <Field
                    name="email"
                    type="email"
                    label="* Email"
                    placeholder="Nhập email"
                    component={CustomInput}
                  />
                </div>
                <div className="checkout-field">
                  <Field
                    name="mobile.value"
                    type="text"
                    label="* Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    component={CustomInput}
                  />
                </div>
                <div className="checkout-field">
                  <Field
                    name="address"
                    type="text"
                    label="* Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    component={CustomInput}
                  />
                </div>
                <div className="checkout-field">
                  <label>
                    <input
                      type="checkbox"
                      checked={isInternational}
                      onChange={(e) => setIsInternational(e.target.checked)}
                    />
                    &nbsp;Giao hàng quốc tế (+50,000đ)
                  </label>
                </div>

                <div className="basket-total text-right">
                  <p className="basket-total-title">Tổng tiền:</p>
                  <h2 className="basket-total-amount">
                    {formatVND(subtotal + (isInternational ? 50000 : 0))}
                  </h2>
                </div>

                <div className="checkout-shipping-action">
                  <button
                    className="button button-muted"
                    onClick={onBack}
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
                    type="submit"
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
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 