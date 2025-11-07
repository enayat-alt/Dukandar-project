


import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Footer from "./components/Footer.jsx";
import RightBannerWrapper from "./components/RightBannerWrapper.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Lazy load all pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx")); // NEW

const App = () => {
  return (
    <>
      <Navbar />

      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
       <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Category Route */}
          <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* NEW */}

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="text-center mt-20 text-xl font-semibold">
                404 | Page Not Found
              </div>
            }
          />
        </Routes>
      </Suspense>

      {/* Right-side banner only on Home */}
      <RightBannerWrapper />

      <Footer />
    </>
  );
};

export default App;
