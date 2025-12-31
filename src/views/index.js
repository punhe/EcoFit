import { lazy } from 'react';

// Lazy load views for better code splitting and performance
export const Home = lazy(() => import('./home'));
export const Shop = lazy(() => import('./shop'));
export const Search = lazy(() => import('./search'));
export const ViewProduct = lazy(() => import('./view_product'));
export const FeaturedProducts = lazy(() => import('./featured'));
export const RecommendedProducts = lazy(() => import('./recommended'));

// Auth pages - lazy loaded
export const SignIn = lazy(() => import('./auth/signin'));
export const SignUp = lazy(() => import('./auth/signup'));
export const AdminSignUp = lazy(() => import('./auth/admin-signup'));
export const ForgotPassword = lazy(() => import('./auth/forgot_password'));

// Account pages - lazy loaded
export const Checkout = lazy(() => import('./checkout'));
export const PaymentResult = lazy(() => import('./checkout/PaymentResult'));
export const EditAccount = lazy(() => import('./account/edit_account'));
export const UserAccount = lazy(() => import('./account/user_account'));

// Admin pages - lazy loaded (rarely accessed by most users)
export const Dashboard = lazy(() => import('./admin/dashboard'));
export const AddProduct = lazy(() => import('./admin/add_product'));
export const EditProduct = lazy(() => import('./admin/edit_product'));
export const Products = lazy(() => import('./admin/products'));
export const Users = lazy(() => import('./admin/users'));

// Error page - can be loaded directly for quick display
export { default as PageNotFound } from './error/PageNotFound';
