import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions';
import { formatVND } from '@/helpers/utils';

const ProductCard = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const didMount = useDidMount();

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
    }
  };

  if (!didMount) {
    return <ProductCardSkeleton />;
  }

  return (
    <div className="product-card">
      <div className="product-card-content">
        <div className="product-card-img-wrapper">
          <img alt={product.name} src={product.image} />
        </div>
        <div className="product-card-info">
          <h4 className="product-card-name">{product.name}</h4>
          <p className="product-card-brand">{product.brand}</p>
          <div className="product-card-price">
            <span className="product-card-price-value">{formatVND(product.price)}</span>
          </div>
          <button
            className="button button-small"
            onClick={handleAddToCart}
            disabled={isLoading || product.quantity < 1}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropType.object.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductCard; 