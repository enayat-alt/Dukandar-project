

import { configureStore } from "@reduxjs/toolkit";

// User slices & APIs
import authReducer from "./slices/authSlice";
import { authApi } from "../services/authApi";
import { productApi } from "../services/productApi";
import { orderApi } from "../services/orderApi"; // user orders

// Admin slices & APIs
import adminAuthReducer from "./slices/adminAuthSlice";
import { adminApi } from "../services/adminApi";
import { adminOrderApi } from "../services/adminOrderApi"; // admin orders

export const store = configureStore({
  reducer: {
    // User
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer, // user orders

    // Admin
    adminAuth: adminAuthReducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [adminOrderApi.reducerPath]: adminOrderApi.reducer, // admin orders
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // User
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,

      // Admin
      adminApi.middleware,
      adminOrderApi.middleware
    ),
});

export default store;
