import { useScrollTop } from '@/hooks';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  useScrollTop();
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <h1>:( An error has occured. Please try again.</h1>
      <br />
      <button
        className="button"
        onClick={() => navigate('/')}
        type="button"
      >
        Try Again
      </button>
    </div>

  );
};

export default Error;
