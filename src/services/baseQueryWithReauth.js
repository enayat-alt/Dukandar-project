import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateAccessToken, logout } from "../store/slices/authSlice";
import { BASE_URL, AUTH_ROUTES } from "./apiRoutes";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If access token expired
  if (result.error && result.error.status === 401) {
    const refreshToken = api.getState().auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    // Call refresh API
    const refreshResult = await baseQuery(
      {
        url: AUTH_ROUTES.REFRESH,
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data?.accessToken) {
      // Save new access token
      api.dispatch(updateAccessToken(refreshResult.data.accessToken));

      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};
