// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: JSON.parse(localStorage.getItem("user")) || null,
//   token: localStorage.getItem("token") || null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Called after successful backend login
//     setCredentials: (state, action) => {
//       const { user, token } = action.payload;

//       state.user = user;
//       state.token = token;

//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("token", token);
//     },

//     // For logout
//     logout: (state) => {
//       state.user = null;
//       state.token = null;

//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Called after successful backend login
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;

      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },

    // Called when access token is refreshed
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },

    // For logout
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const {
  setCredentials,
  updateAccessToken,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
