import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ProductDebug = () => {
  const products = useSelector((state) => state.products.items);

  useEffect(() => {
    console.log('=== PRODUCT DEBUG ===');
    console.log('Total products:', products.length);

    if (products.length > 0) {
      const firstProduct = products[0];
      console.log('First product:', firstProduct);
      console.log('Has image field?', !!firstProduct.image);
      console.log('Has imageUrl field?', !!firstProduct.imageUrl);
      console.log('image value:', firstProduct.image);
      console.log('imageUrl value:', firstProduct.imageUrl);

      // Check all products
      const withImage = products.filter(p => p.image).length;
      const withImageUrl = products.filter(p => p.imageUrl).length;
      console.log(`Products with image: ${withImage}/${products.length}`);
      console.log(`Products with imageUrl: ${withImageUrl}/${products.length}`);
    }

    console.log('=== END DEBUG ===');
  }, [products]);

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      maxWidth: '400px',
      maxHeight: '80vh',
      overflow: 'auto',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <h3>Product Debug Info</h3>
      <p><strong>Total Products:</strong> {products.length}</p>

      {products.length > 0 && (
        <>
          <h4>First Product:</h4>
          <pre style={{ fontSize: '10px', overflow: 'auto' }}>
            {JSON.stringify(products[0], null, 2)}
          </pre>

          <h4>Image Status:</h4>
          <ul>
            <li>Has 'image': {products.filter(p => p.image).length}</li>
            <li>Has 'imageUrl': {products.filter(p => p.imageUrl).length}</li>
            <li>Has neither: {products.filter(p => !p.image && !p.imageUrl).length}</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ProductDebug;
