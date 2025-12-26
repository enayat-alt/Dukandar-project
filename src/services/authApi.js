import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { AUTH_ROUTES } from "./apiRoutes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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

    refresh: builder.mutation({
      query: (refreshToken) => ({
        url: AUTH_ROUTES.REFRESH,
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshMutation,
} = authApi;
