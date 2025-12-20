
import { createSlice } from '@reduxjs/toolkit';

//  Initialize from localStorage if available
const initialState = {
  admin: JSON.parse(localStorage.getItem('admin')) || null,
  token: localStorage.getItem('adminToken') || null,
  isLoggedIn: !!localStorage.getItem('adminToken'),
};

const adminAuthSlice = createSlice({
  name: 'adminAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { admin, token } = action.payload;
      state.admin = admin;
      state.token = token;
      state.isLoggedIn = true;

      //  Save to localStorage
      localStorage.setItem('admin', JSON.stringify(admin));
      localStorage.setItem('adminToken', token);
    },
    logout: (state) => {
      state.admin = null;
      state.token = null;
      state.isLoggedIn = false;

      // Remove from localStorage
      localStorage.removeItem('admin');
      localStorage.removeItem('adminToken');
    },
  },
});

export const { setCredentials, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
