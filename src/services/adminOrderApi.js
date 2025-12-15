import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./apiRoutes"; // your backend URL

export const adminOrderApi = createApi({
  reducerPath: "adminOrderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().adminAuth?.token; // ✅ use admin token
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["AdminOrders"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => "/orders/admin/all",
      providesTags: ["AdminOrders"],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AdminOrders"],
    }),
  }),
});

export const { useGetAllOrdersQuery, useCancelOrderMutation } = adminOrderApi;
