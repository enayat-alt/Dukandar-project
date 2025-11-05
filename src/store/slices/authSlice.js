import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  users: JSON.parse(localStorage.getItem("users")) || [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const existingUser = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (existingUser) {
        state.user = existingUser;
        localStorage.setItem("user", JSON.stringify(existingUser));
      } else {
        state.user = null;
      }
    },
    signup: (state, action) => {
      const { name, email, password } = action.payload;
      const existingUser = state.users.find((u) => u.email === email);
      if (!existingUser) {
        const newUser = { name, email, password };
        state.users.push(newUser);
        state.user = newUser;
        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("user", JSON.stringify(newUser));
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, signup, logout } = authSlice.actions;
export default authSlice.reducer;
