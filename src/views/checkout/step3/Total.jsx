import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { useFormikContext } from 'formik';
import { formatVND } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setPaymentDetails } from '@/redux/actions/checkoutActions';

const Total = ({ isInternational, subtotal }) => {
  const { values, submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();

  const onClickBack = () => {
    // destructure to only select left fields omitting cardnumber and ccv
    const { cardnumber, ccv, ...rest } = values;

    dispatch(setPaymentDetails({ ...rest })); // save payment details
    history.push(CHECKOUT_STEP_2);
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
        >
          <ArrowLeftOutlined />
          &nbsp;
          Quay lại
        </button>
        <button
          className="button"
          disabled={false}
          onClick={submitForm}
          type="button"
        >
          <CheckOutlined />
          &nbsp;
          Xác nhận
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
