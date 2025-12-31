import { LoadingOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React, { useState, useRef, useEffect, memo } from 'react';

// Cache to prevent re-loading same images
const imageCache = new Set();

const ImageLoader = memo(({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(imageCache.has(src));
  const [error, setError] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onLoad = () => {
    imageCache.add(src);
    setLoaded(true);
    setError(false);
  };

  const onError = () => {
    setLoaded(true);
    setError(true);
  };

  // Fallback placeholder image
  const fallbackSrc = 'https://via.placeholder.com/400x400/F5F5DC/8B4513?text=No+Image';

  // Use a tiny placeholder while image is loading
  const placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Crect fill="%23E8DCC4" width="1" height="1"/%3E%3C/svg%3E';

  return (
    <div ref={imgRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && (
        <LoadingOutlined style={{
          position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto',
          fontSize: '24px', color: '#8B4513'
        }}
        />
      )}
      <img
        alt={alt || ''}
        className={`${className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
        onLoad={onLoad}
        onError={onError}
        src={inView ? (error ? fallbackSrc : src) : placeholder}
        loading="lazy"
        decoding="async"
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </div>
  );
});

ImageLoader.displayName = 'ImageLoader';

ImageLoader.defaultProps = {
  className: 'image-loader'
};

ImageLoader.propTypes = {
  src: PropType.string.isRequired,
  alt: PropType.string,
  className: PropType.string
};

export default ImageLoader;
