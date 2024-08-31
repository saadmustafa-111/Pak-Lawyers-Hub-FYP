// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,  // Initialize user as null when not logged in
  token: null, // Initialize token as null when not logged in
  isAuthenticated: false, // Flag to track if user is authenticated
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user; // Set user object from payload
      state.token = action.payload.token; // Set token from payload
      state.isAuthenticated = true; // Set isAuthenticated to true
    },
    logoutSuccess: (state) => {
      state.user = null; // Reset user to null
      state.token = null; // Reset token to null
      state.isAuthenticated = false; // Set isAuthenticated to false
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
