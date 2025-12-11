
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "../services/authApi";
import { productApi } from "../services/productApi";

// Admin imports
import adminAuthReducer from "./slices/adminAuthSlice";
import { adminApi } from "../services/adminApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,                     // user auth
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    
    adminAuth: adminAuthReducer,           // admin auth
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      adminApi.middleware       // add admin API middleware
    ),
});

export default store;
