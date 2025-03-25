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
      <PublicRoute
        path={ROUTES.SIGNIN}
        component={view.SignIn}
      />
      <PublicRoute
        path={ROUTES.SIGNUP}
        component={view.SignUp}
      />
      <PublicRoute
        path={ROUTES.FORGOT_PASSWORD}
        component={view.ForgotPassword}
      />
      <ClientRoute
        path={ROUTES.CHECKOUT}
        component={view.Checkout}
      />
      <ClientRoute
        path="/checkout/success"
        component={view.PaymentResult}
      />
      <ClientRoute
        path="/checkout/cancel"
        component={view.PaymentResult}
      />
      <ClientRoute
        path="/account"
        component={view.UserAccount}
      />
      <ClientRoute
        path={ROUTES.ACCOUNT_EDIT}
        component={view.EditAccount}
      />
      <AdminRoute
        path={ROUTES.ADMIN_DASHBOARD}
        component={view.Dashboard}
      />
      <AdminRoute
        path={ROUTES.ADMIN_PRODUCTS}
        component={view.Products}
      />
      <AdminRoute
        path={ROUTES.ADD_PRODUCT}
        component={view.AddProduct}
      />
      <AdminRoute
        path={ROUTES.EDIT_PRODUCT}
        component={view.EditProduct}
      />
      <Route path="*" component={view.PageNotFound} />
    </Switch>
    <Footer />
  </Router>
);

export default AppRouter;
