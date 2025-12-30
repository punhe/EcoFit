/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ClientRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);
  const location = useLocation();
  const isAuth = !!auth?.id && !!auth?.role;
  const role = auth?.role || '';

  if (isAuth && role === 'USER') {
    return <main className="content">{children}</main>;
  }

  if (isAuth && role === 'ADMIN') {
    return <Navigate to={ADMIN_DASHBOARD} replace />;
  }

  return <Navigate to={SIGNIN} state={{ from: location }} replace />;
};

ClientRoute.propTypes = {
  children: PropType.node.isRequired
};

export default ClientRoute;
