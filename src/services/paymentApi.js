import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./apiRoutes"; 

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
 
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
