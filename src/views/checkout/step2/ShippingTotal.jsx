import { useFormikContext } from 'formik';
import { formatVND } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';

const ShippingTotal = ({ subtotal }) => {
  const { values } = useFormikContext();

  return (
    <div className="checkout-total d-flex-end padding-right-m">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">
                Phí vận chuyển quốc tế: &nbsp;
              </span>
            </td>
            <td>
              <h4 className="basket-total-amount text-subtle text-right margin-0 ">
                {values.isInternational ? '50.000 VNĐ' : '0 VNĐ'}
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">
                Tạm tính: &nbsp;
              </span>
            </td>
            <td>
              <h4 className="basket-total-amount text-subtle text-right margin-0">
                {formatVND(subtotal)}
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">
                Tổng tiền: &nbsp;
              </span>
            </td>
            <td>
              <h2 className="basket-total-amount text-right">
                {formatVND(Number(subtotal) + (values.isInternational ? 50000 : 0))}
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

ShippingTotal.propTypes = {
  subtotal: PropType.number.isRequired
};

export default ShippingTotal;
