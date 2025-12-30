/* eslint-disable react/forbid-prop-types */
import { FeaturedProduct } from '@/components/product';
import PropType from 'prop-types';
import React from 'react';

const ProductShowcase = ({ products, skeletonCount }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '1rem',
    width: '100%'
  }}>
    {(products.length === 0) ? new Array(skeletonCount).fill({}).map((product, index) => (
      <div key={`product-skeleton ${index}`}>
        <FeaturedProduct product={product} />
      </div>
    )) : products.map((product) => (
      <div key={product.id}>
        <FeaturedProduct product={product} />
      </div>
    ))}
  </div>
);

ProductShowcase.defaultProps = {
  skeletonCount: 4
};

ProductShowcase.propTypes = {
  products: PropType.array.isRequired,
  skeletonCount: PropType.number
};

export default ProductShowcase;
