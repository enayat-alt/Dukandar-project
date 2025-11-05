// // src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import ProductDetails from "./pages/ProductDetails";
// import Cart from "./pages/Cart";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/orders" element={<Orders />} />

//       </Routes>
//     </Router>
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Cart from "./pages/Cart.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Navbar from "./components/Navbar.jsx";
// import Orders from "./pages/Orders";

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//          <Route path="/orders" element={<Orders />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Cart from "./pages/Cart.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";
// import Navbar from "./components/Navbar.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route
//           path="/cart"
//           element={
//             <PrivateRoute>
//               <Cart />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <PrivateRoute>
//               <ProductDetails />
//             </PrivateRoute>
//           }
//         />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
//     </>
//   );
// };

// export default App;


// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Pages
// import Home from "./pages/Home.jsx";
// import Cart from "./pages/Cart.jsx";
// import Orders from "./pages/Orders.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
// import Login from "./pages/Login.jsx";
// import Signup from "./pages/Signup.jsx";

// // Components
// import Navbar from "./components/Navbar.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

// const App = () => {
//   return (
//     <>
//       {/* Navbar is always visible */}
//       <Navbar />

//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected Routes */}
//         <Route
//           path="/cart"
//           element={
//             <PrivateRoute>
//               <Cart />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/orders"
//           element={
//             <PrivateRoute>
//               <Orders />
//             </PrivateRoute>
//           }
//         />
//         <Route
//           path="/product/:id"
//           element={
//             <PrivateRoute>
//               <ProductDetails />
//             </PrivateRoute>
//           }
//         />

//         {/* 404 Fallback */}
//         <Route
//           path="*"
//           element={
//             <div className="text-center mt-20 text-xl font-semibold">
//               404 | Page Not Found
//             </div>
//           }
//         />
//       </Routes>
//     </>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Orders from "./pages/Orders.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
        <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />

        <Route path="*" element={<div className="text-center mt-20 text-xl font-semibold">404 | Page Not Found</div>} />
      </Routes>
       <Footer />
    </>
  );
};

export default App;
