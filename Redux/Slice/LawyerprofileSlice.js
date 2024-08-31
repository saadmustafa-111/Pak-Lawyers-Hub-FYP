// slices/lawyerProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialProfileState = {
  profile: null,  // Initialize profile as null
  status: 'idle', // idle | loading | succeeded | failed
  error: null,    // Initialize error as null
};

const lawyerProfileSlice = createSlice({
  name: 'lawyerProfile',
  initialState: initialProfileState,
  reducers: {
    profileCreationStart: (state) => {
      state.status = 'loading';
    },
    profileCreationSuccess: (state, action) => {
      state.status = 'succeeded';
      state.profile = action.payload;
      state.error = null;
    },
    profileCreationFailed: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    resetProfileState: (state) => {
      state.status = 'idle';
      state.profile = null;
      state.error = null;
    },
  },
});

export const {
  profileCreationStart,
  profileCreationSuccess,
  profileCreationFailed,
  resetProfileState,
} = lawyerProfileSlice.actions;

export default lawyerProfileSlice.reducer;
