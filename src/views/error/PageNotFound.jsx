import { useScrollTop } from '@/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  useScrollTop();
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <h1>:( Page you are looking for doesn&apos;t exists.</h1>
      <br />
      <button
        className="button"
        onClick={() => navigate(-1)}
        type="button"
      >
        Go back
      </button>
    </div>
  );
};

export default PageNotFound;
