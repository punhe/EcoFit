/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AdminNavigation, AdminSideBar } from '@/components/common';
import PropType from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { auth } = useSelector((state) => state);
  const isAuth = !!auth?.id && !!auth?.role;
  const role = auth?.role || '';

  if (isAuth && role === 'ADMIN') {
    return (
      <>
        <AdminNavigation />
        <main className="content-admin">
          <AdminSideBar />
          <div className="content-admin-wrapper">
            {children}
          </div>
        </main>
      </>
    );
  }

  return <Navigate to="/" replace />;
};

AdminRoute.propTypes = {
  children: PropType.node.isRequired
};

export default AdminRoute;
