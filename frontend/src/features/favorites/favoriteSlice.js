import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchfavorites } from "./favoriteApi";
// Initial State
const initialState = {
  favorites: null,
  isLoading: false,
  isError: false,
  error: null,
};


export const getFavorites = createAsyncThunk('favorites/getfavorites', async () => {
  const favorites = await fetchfavorites()
  return favorites
});




const favoriteSlice = createSlice({
  name: "favorites",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.isLoading = false;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
})


export default favoriteSlice.reducer;