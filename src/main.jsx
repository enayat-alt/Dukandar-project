// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// src/main.jsx
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { CartProvider } from "./context/CartContext.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <CartProvider>
//       <App />
//     </CartProvider>
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { store } from "./store/store.js";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import { store } from "./store/store.js";

// Cart Context
import { CartProvider } from "./context/CartContext.jsx";

// Global CSS
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux provider for auth */}
    <Provider store={store}>
      {/* Cart context provider for cart management */}
      <CartProvider>
        {/* React Router for routing */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </Provider>
  </React.StrictMode>
);
