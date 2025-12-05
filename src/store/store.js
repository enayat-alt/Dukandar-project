// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/authApi";
import { productApi } from "./services/productApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware),
});

export default store;
