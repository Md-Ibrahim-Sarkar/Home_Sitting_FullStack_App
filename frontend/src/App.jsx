import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import UpdateProfile from "./components/UpdateProfile";
import Footer from "./components/Footer";
import ContactUs from "./components/Contact_Us";
import ErrorPage from "./components/ErrorPage";
import { Helmet } from "react-helmet";
import Wishlist from "./components/user-account/Wishlist";
import Register from "./pages/auth/Register";
import { AuthContext } from "./context/auth/AuthContext";
import LogIn from "./pages/auth/LogIn";
import ShoppingCart from "./components/shopping/ShoppingCart";
import ProductCategories from "./pages/Product_Categorys";
import ProductDetails from "./pages/ProductDetails";
import MyOrder from "./components/user-account/My_Order";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import AllProducts from "./pages/admin/products/All_Products";
import ProductForm from "./pages/admin/products/Add_Product";
import AddCategories from "./pages/admin/categories/Add_Categories";
import EditProduct from "./pages/admin/products/Edit_Product";
import AllOrders from "./pages/admin/orders/AllOrders";
import PendingOrders from "./pages/admin/orders/PendingOrders";
import CompletedOrders from "./pages/admin/orders/CompletedOrders";
import Users from "./pages/admin/users/Users";
import OrderManagement from "./pages/admin/orders/OrderManagement";
import SiteAnalytics from "./pages/admin/analytics/SiteAnalytics";
import Settings from "./pages/admin/settings/Settings";
import PublicProfile from './components/PublicProfile';
import ContactMessages from "./pages/admin/ContactMessages";
import SalesReport from "./pages/admin/SalesReport";

const App = () => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/admin-dashboard");
  const pathSegments = pathname.split("/").filter(Boolean);
  const pathName = pathSegments[pathSegments.length - 1] || "Home";
  const formattedPath = pathName.replace(/-/g, " ");
  const { user, isLoading } = useContext(AuthContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sowda | {formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1)}</title>
        <link rel="canonical" href={`https://yourwebsite.com${pathname}`} />
      </Helmet>
      <div className="sticky top-0 z-[100000] bg-white shadow-2xl">
        {!isDashboard && <Navbar />}
      </div>

      <div>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/order-confirmation" element={<PrivateRoute><OrderConfirmation /></PrivateRoute>} />

          {/* Dynamic Product Category Route */}
          <Route path="/product-category/:category?" element={<ProductCategories />} />

          {/* Product Details */}
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/shopping-cart" element={<ShoppingCart />} />

          {/* Protected Routes */}
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/my-orders" element={<PrivateRoute><MyOrder /></PrivateRoute>} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="all-products" element={<AllProducts />} />
            <Route path="add-product" element={<ProductForm />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="add-category" element={<AddCategories />} />
            <Route path="analytics" element={<SiteAnalytics />} />
            <Route path="settings" element={<Settings />} />

            {/* Orders */}
            <Route path="orders" element={<AllOrders />} />
            <Route path="orders/pending" element={<PendingOrders />} />
            <Route path="orders/completed" element={<CompletedOrders />} />
            <Route path="orders/management" element={<OrderManagement />} />

            {/* Users */}
            <Route path="users" element={<Users />} />
            <Route path="contact-messages" element={<ContactMessages />} />
            <Route path="sales-report" element={<SalesReport />} />
          </Route>

          {/* Public Profile Route */}
          <Route path="/my-profile" element={<PrivateRoute><PublicProfile /></PrivateRoute>} />

          {/* 404 Page */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>

      {!isDashboard && <Footer />}
      <ToastContainer autoClose={700} position="top-right" className="z-[100000] mt-20" />
    </>
  );
};

export default App;
