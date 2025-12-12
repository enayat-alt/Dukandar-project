

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, AUTH_ROUTES } from "./apiRoutes"; // ✅ import centralized base URL & routes

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: AUTH_ROUTES.REGISTER,
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: AUTH_ROUTES.LOGIN,
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
