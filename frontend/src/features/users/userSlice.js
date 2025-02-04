import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  users: null,
  isLoading: false,
  isError: false,
  error: null,
};

// Create Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Set Loading State
    setLoading: (state) => {
      state.isLoading = true;
    },
    // Add New User
    addUser: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    // Set Error State
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload;
      state.isLoading = false;
    },
    // Clear Error
    clearError: (state) => {
      state.isError = false;
      state.error = null;
      state.isLoading = false;
    },
  }
});


export const { addUser, setLoading, setError, clearError } = usersSlice.actions;
export default usersSlice.reducer;
