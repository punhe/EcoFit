import { LoadingOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React, { useState } from 'react';

const ImageLoader = ({ src, alt, className }) => {
  const loadedImages = {};
  const [loaded, setLoaded] = useState(loadedImages[src]);
  const [error, setError] = useState(false);

  const onLoad = () => {
    loadedImages[src] = true;
    setLoaded(true);
    setError(false);
  };

  const onError = () => {
    setLoaded(true);
    setError(true);
  };

  // Fallback placeholder image
  const fallbackSrc = 'https://via.placeholder.com/400x400/F5F5DC/8B4513?text=No+Image';

  return (
    <>
      {!loaded && (
        <LoadingOutlined style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto'
        }}
        />
      )}
      <img
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={onLoad}
        onError={onError}
        src={error ? fallbackSrc : src}
      />
    </>
  );
};

ImageLoader.defaultProps = {
  className: 'image-loader'
};

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string,
  className: PropType.string
};

export default ImageLoader;
