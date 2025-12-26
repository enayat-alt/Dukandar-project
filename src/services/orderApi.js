import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getUserOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),

    placeOrder: builder.mutation({
      query: ({ items = [], paymentIntent }) => {
        if (!Array.isArray(items) || items.length === 0) {
          throw new Error("Cart is empty or invalid");
        }

        const formattedItems = items.map((item) => ({
          productId: item.productId || item.id,
          quantity: item.quantity || 1,
        }));

        const totalPrice = formattedItems.reduce(
          (total, item) =>
            total + Number(item.price || 0) * (item.quantity || 1),
          0
        );

        return {
          url: "/orders",
          method: "POST",
          body: {
            items: formattedItems,
            totalPrice,
            paymentId: paymentIntent?.id || null,
            paymentStatus: paymentIntent?.status || "pending",
          },
        };
      },
      invalidatesTags: ["Orders"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  usePlaceOrderMutation,
  useCancelOrderMutation,
} = orderApi;
