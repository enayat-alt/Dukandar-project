
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
