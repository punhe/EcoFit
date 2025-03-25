/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ClientRoute = ({
  isAuth, role, component: Component, ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuth && role === 'USER') {
        return (
          <main className="content">
            <Component {...props} />
          </main>
        );
      }

      if (isAuth && role === 'ADMIN') {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      return (
        <Redirect to={{
          pathname: SIGNIN,
          state: { from: props.location }
        }}
        />
      );
    }}
  />
);

ClientRoute.defaultProps = {
  isAuth: false,
  role: 'USER'
};

ClientRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth?.id && !!auth?.role,
  role: auth?.role || ''
});

export default connect(mapStateToProps)(ClientRoute);
