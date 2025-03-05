import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/actions/cartActions';
import { formatVND } from '@/helpers/utils';

const ProductDetail = ({ product, isLoading }) => {
  const dispatch = useDispatch();
  const didMount = useDidMount();

  const handleAddToCart = () => {
    if (product.quantity > 0) {
      dispatch(addToCart(product));
    }
  };

  if (!didMount) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-content">
        <div className="product-detail-image">
          <img alt={product.name} src={product.image} />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-brand">{product.brand}</p>
          <div className="product-detail-price">
            <span className="product-detail-price-value">{formatVND(product.price)}</span>
          </div>
          <p className="product-detail-description">{product.description}</p>
          <button
            className="button button-large"
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

ProductDetail.propTypes = {
  product: PropType.object.isRequired,
  isLoading: PropType.bool.isRequired,
};

export default ProductDetail; 