/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children, path }) => {
  const { auth } = useSelector((state) => state);
  const location = useLocation();
  const isAuth = !!auth?.id && !!auth?.role;
  const role = auth?.role || '';
  const from = location.state?.from?.pathname || '/';

  if (isAuth && role === 'ADMIN') {
    return <Navigate to={ADMIN_DASHBOARD} replace />;
  }

  if ((isAuth && role === 'USER') && (path === SIGNIN || path === SIGNUP)) {
    return <Navigate to={from} replace />;
  }

  return <main className="content">{children}</main>;
};

PublicRoute.defaultProps = {
  path: '/'
};

PublicRoute.propTypes = {
  children: PropType.node.isRequired,
  path: PropType.string
};

export default PublicRoute;
