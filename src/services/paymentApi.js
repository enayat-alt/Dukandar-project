import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./apiRoutes"; // centralized backend URL

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // Create Stripe PaymentIntent
    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body: { amount },
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
