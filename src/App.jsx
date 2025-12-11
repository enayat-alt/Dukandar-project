

// import React, { Suspense, lazy } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import Footer from "./components/Footer.jsx";
// import RightBannerWrapper from "./components/RightBannerWrapper.jsx";
// import ScrollToTop from "./components/ScrollToTop.jsx";

// // Lazy load user pages
// const Home = lazy(() => import("./pages/Home.jsx"));
// const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Orders = lazy(() => import("./pages/Orders.jsx"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Signup = lazy(() => import("./pages/Signup.jsx"));
// const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));

// // Lazy load admin pages
// const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
// const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
// const Products = lazy(() => import("./pages/admin/Products.jsx"));
// const AdminOrders = lazy(() => import("./pages/admin/Orders.jsx"));

// const App = () => {
//   const adminToken = useSelector((state) => state.adminAuth.token);
//   const location = useLocation();

//   // Hide Navbar, Footer, RightBanner on admin pages
//   const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdminPage && <Navbar />}

//       <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/category/:categoryName" element={<CategoryPage />} />

//           {/* Protected User Routes */}
//           <Route
//             path="/cart"
//             element={
//               <PrivateRoute>
//                 <Cart />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/orders"
//             element={
//               <PrivateRoute>
//                 <Orders />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/product/:id"
//             element={
//               <PrivateRoute>
//                 <ProductDetails />
//               </PrivateRoute>
//             }
//           />

//           {/* Admin Routes */}
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route
//             path="/admin/dashboard/*"
//             element={adminToken ? <Dashboard /> : <Navigate to="/admin-login" />}
//           >
//             {/* Nested admin routes */}
//             <Route path="products" element={<Products />} />
//             <Route path="orders" element={<AdminOrders />} />
//             <Route index element={<div>Welcome to Admin Dashboard</div>} />
//           </Route>

//           {/* 404 Page */}
//           <Route
//             path="*"
//             element={
//               <div className="text-center mt-20 text-xl font-semibold">
//                 404 | Page Not Found
//               </div>
//             }
//           />
//         </Routes>
//       </Suspense>

//       {!isAdminPage && <RightBannerWrapper />}
//       {!isAdminPage && <Footer />}
//     </>
//   );
// };

// export default App;


// import React, { Suspense, lazy } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";
// import Footer from "./components/Footer.jsx";
// import RightBannerWrapper from "./components/RightBannerWrapper.jsx";
// import ScrollToTop from "./components/ScrollToTop.jsx";

// // Lazy load user pages
// const Home = lazy(() => import("./pages/Home.jsx"));
// const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Orders = lazy(() => import("./pages/Orders.jsx"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
// const Login = lazy(() => import("./pages/Login.jsx"));
// const Signup = lazy(() => import("./pages/Signup.jsx"));
// const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));

// // Lazy load admin pages
// const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
// const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
// const Products = lazy(() => import("./pages/admin/Products.jsx"));
// const AdminOrders = lazy(() => import("./pages/admin/Orders.jsx"));


// const App = () => {
//   const adminToken = useSelector((state) => state.adminAuth.token);
//   const location = useLocation();

//   // Hide Navbar, Footer, RightBanner on admin pages
//   const isAdminPage = location.pathname.startsWith("/admin");

//   return (
//     <>
//       {!isAdminPage && <Navbar />}

//       <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/category/:categoryName" element={<CategoryPage />} />

//           {/* Protected User Routes */}
//           <Route
//             path="/cart"
//             element={
//               <PrivateRoute>
//                 <Cart />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/orders"
//             element={
//               <PrivateRoute>
//                 <Orders />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/product/:id"
//             element={
//               <PrivateRoute>
//                 <ProductDetails />
//               </PrivateRoute>
//             }
//           />

//           {/* Admin Routes */}
//           <Route path="/admin-login" element={<AdminLogin />} />
//           <Route
//             path="/admin/dashboard/*"
//             element={
//               adminToken ? <Dashboard /> : <Navigate to="/admin-login" />
//             }
//           >
//             {/* Nested admin routes */}
//             <Route index element={<div>Welcome to Admin Dashboard</div>} />
//             <Route path="products" element={<Products />} />
//             <Route path="orders" element={<AdminOrders />} />
//           </Route>

//           {/* 404 Page */}
//           <Route
//             path="*"
//             element={
//               <div className="text-center mt-20 text-xl font-semibold">
//                 404 | Page Not Found
//               </div>
//             }
//           />
//         </Routes>
//       </Suspense>

//       {!isAdminPage && <RightBannerWrapper />}
//       {!isAdminPage && <Footer />}
//     </>
//   );
// };

// export default App;


import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Footer from "./components/Footer.jsx";
import RightBannerWrapper from "./components/RightBannerWrapper.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

// Lazy load user pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Orders = lazy(() => import("./pages/Orders.jsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const CategoryPage = lazy(() => import("./pages/CategoryPage.jsx"));

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AdminRegister = lazy(() => import("./pages/admin/AdminRegister.jsx")); // <-- added
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const Products = lazy(() => import("./pages/admin/Products.jsx"));
const AdminOrders = lazy(() => import("./pages/admin/Orders.jsx"));

const App = () => {
  const adminToken = useSelector((state) => state.adminAuth.token);
  const location = useLocation();

  // Hide Navbar, Footer, RightBanner on admin pages
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Suspense fallback={<div className="text-center mt-20">Loading...</div>}>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />

          {/* Protected User Routes */}
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

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} /> {/* <-- added */}
          <Route
            path="/admin/dashboard/*"
            element={
              adminToken ? <Dashboard /> : <Navigate to="/admin-login" />
            }
          >
            {/* Nested admin routes */}
            <Route index element={<div>Welcome to Admin Dashboard</div>} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>

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

      {!isAdminPage && <RightBannerWrapper />}
      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;
