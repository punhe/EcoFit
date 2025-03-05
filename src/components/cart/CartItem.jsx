import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '@/redux/actions/cartActions';
import { formatVND } from '@/helpers/utils';

const CartItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value, 10);
    if (quantity > 0) {
      dispatch(updateCartItemQuantity(product.id, quantity));
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img alt={product.name} src={product.image} />
      </div>
      <div className="cart-item-info">
        <h4 className="cart-item-name">{product.name}</h4>
        <p className="cart-item-brand">{product.brand}</p>
        <div className="cart-item-price">
          <span className="cart-item-price-value">{formatVND(product.price)}</span>
        </div>
        <div className="cart-item-quantity">
          <label htmlFor="quantity">Số lượng:</label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={product.quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <button
          className="button button-small"
          onClick={handleRemoveFromCart}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  product: PropType.object.isRequired,
};

export default CartItem; 