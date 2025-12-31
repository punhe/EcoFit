import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as ROUTES from "@/constants/routes";

import { Navigation, Footer } from "@/components/common";
import { Basket } from "@/components/basket";
import * as view from "@/views";
import AdminRoute from "./AdminRoute";
import ClientRoute from "./ClientRoute";
import PublicRoute from "./PublicRoute";

// Loading spinner for lazy loaded components
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid #E8DCC4',
      borderTop: '4px solid #8B4513',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
    <span style={{ color: '#8B4513', fontFamily: 'serif' }}>Đang tải...</span>
  </div>
);

const AppRouter = () => (
  <BrowserRouter>
    <Navigation />
    <Basket />
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<view.Home />} />
        <Route path="/search" element={<view.Search />} />
        <Route path="/product/:id" element={<view.ViewProduct />} />
        <Route path="/featured" element={<view.FeaturedProducts />} />
        <Route path="/recommended" element={<view.RecommendedProducts />} />
        <Route path={ROUTES.SHOP} element={<view.Shop />} />
        <Route
          path={ROUTES.SIGNIN}
          element={
            <PublicRoute path={ROUTES.SIGNIN}>
              <view.SignIn />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.SIGNUP}
          element={
            <PublicRoute path={ROUTES.SIGNUP}>
              <view.SignUp />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <PublicRoute path={ROUTES.FORGOT_PASSWORD}>
              <view.ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_SIGNUP}
          element={<view.AdminSignUp />}
        />
        <Route
          path={ROUTES.CHECKOUT}
          element={
            <ClientRoute>
              <view.Checkout />
            </ClientRoute>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <ClientRoute>
              <view.PaymentResult />
            </ClientRoute>
          }
        />
        <Route
          path="/checkout/cancel"
          element={
            <ClientRoute>
              <view.PaymentResult />
            </ClientRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ClientRoute>
              <view.UserAccount />
            </ClientRoute>
          }
        />
        <Route
          path={ROUTES.ACCOUNT_EDIT}
          element={
            <ClientRoute>
              <view.EditAccount />
            </ClientRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <AdminRoute>
              <view.Dashboard />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_PRODUCTS}
          element={
            <AdminRoute>
              <view.Products />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADD_PRODUCT}
          element={
            <AdminRoute>
              <view.AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.EDIT_PRODUCT}
          element={
            <AdminRoute>
              <view.EditProduct />
            </AdminRoute>
          }
        />
        <Route
          path={ROUTES.ADMIN_USERS}
          element={
            <AdminRoute>
              <view.Users />
            </AdminRoute>
          }
        />
        <Route path="*" element={<view.PageNotFound />} />
      </Routes>
    </Suspense>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
