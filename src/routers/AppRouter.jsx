import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import * as ROUTES from "@/constants/routes";

import { Navigation, Footer } from "@/components/common";
import { Basket } from "@/components/basket";
import * as view from "@/views";
import AdminRoute from "./AdminRoute";
import ClientRoute from "./ClientRoute";
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <Navigation />
    <Basket />
    <Switch>
      <Route exact path="/" component={view.Home} />
      <Route path="/search" component={view.Search} />
      <Route path="/product/:id" component={view.ViewProduct} />
      <Route path="/featured" component={view.FeaturedProducts} />
      <Route path="/recommended" component={view.RecommendedProducts} />
      <Route path={ROUTES.SHOP} component={view.Shop} />
      <Route
        path={ROUTES.SIGNIN}
        component={() => (
          <PublicRoute>
            <view.SignIn />
          </PublicRoute>
        )}
      />
      <Route
        path={ROUTES.SIGNUP}
        component={() => (
          <PublicRoute>
            <view.SignUp />
          </PublicRoute>
        )}
      />
      <Route
        path={ROUTES.FORGOT_PASSWORD}
        component={() => (
          <PublicRoute>
            <view.ForgotPassword />
          </PublicRoute>
        )}
      />
      <Route
        path={ROUTES.CHECKOUT}
        component={() => (
          <ClientRoute>
            <view.Checkout />
          </ClientRoute>
        )}
      />
      <Route
        path="/checkout/success"
        component={() => (
          <ClientRoute>
            <view.PaymentResult />
          </ClientRoute>
        )}
      />
      <Route
        path="/checkout/cancel"
        component={() => (
          <ClientRoute>
            <view.PaymentResult />
          </ClientRoute>
        )}
      />
      <Route
        path="/account"
        component={() => (
          <ClientRoute>
            <view.UserAccount />
          </ClientRoute>
        )}
      />
      <Route
        path={ROUTES.ACCOUNT_EDIT}
        component={() => (
          <ClientRoute>
            <view.EditAccount />
          </ClientRoute>
        )}
      />
      <Route
        path={ROUTES.ADMIN_DASHBOARD}
        component={() => (
          <AdminRoute>
            <view.Dashboard />
          </AdminRoute>
        )}
      />
      <Route
        path={ROUTES.ADMIN_PRODUCTS}
        component={() => (
          <AdminRoute>
            <view.Products />
          </AdminRoute>
        )}
      />
      <Route
        path={ROUTES.ADD_PRODUCT}
        component={() => (
          <AdminRoute>
            <view.AddProduct />
          </AdminRoute>
        )}
      />
      <Route
        path={ROUTES.EDIT_PRODUCT}
        component={() => (
          <AdminRoute>
            <view.EditProduct />
          </AdminRoute>
        )}
      />
      <Route path="*" component={view.PageNotFound} />
    </Switch>
    <Footer />
  </Router>
);

export default AppRouter;
