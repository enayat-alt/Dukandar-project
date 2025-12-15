// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "./apiRoutes"; // your centralized backend URL

// export const orderApi = createApi({
//   reducerPath: "orderApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       // ✅ Get user token from Redux
//       const token = getState().auth.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Orders"], // used for auto-refetch after cancel
//   endpoints: (builder) => ({
//     // 🔹 Get all orders for logged-in user
//     getUserOrders: builder.query({
//       query: () => "/orders", // ✅ match backend route
//       providesTags: ["Orders"], // auto refetch if Orders tag invalidates
//     }),

//     // 🔹 Cancel (delete) an order
//     cancelOrder: builder.mutation({
//       query: (orderId) => ({
//         url: `/orders/${orderId}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Orders"], // auto refresh orders after cancellation
//     }),
//   }),
// });

// // ✅ Export hooks for components
// export const {
//   useGetUserOrdersQuery,
//   useCancelOrderMutation,
// } = orderApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./apiRoutes"; // centralized backend URL

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Orders"], // used to auto-refresh
  endpoints: (builder) => ({
    // ✅ Get orders for logged-in user
    getUserOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    // ✅ Place a new order
    placeOrder: builder.mutation({
      query: (cartItems) => ({
        url: "/orders",
        method: "POST",
        body: { items: cartItems },
      }),
      invalidatesTags: ["Orders"], // auto-refresh getUserOrders
    }),

    // ✅ Cancel (delete) an order
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"], // auto-refresh getUserOrders
    }),
  }),
});

// Export hooks for components
export const {
  useGetUserOrdersQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
} = orderApi;

