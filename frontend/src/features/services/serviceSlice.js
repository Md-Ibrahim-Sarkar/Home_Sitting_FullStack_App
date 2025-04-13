import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchServices } from "./servicesApi";
// Initial State
const initialState = {
  services: null,
  isLoading: false,
  isError: false,
  error: null,
};


export const getServices = createAsyncThunk('services/getServices', async (searchValue) => {
  const services = await fetchServices(searchValue)
  return services
});




const serviceSlice = createSlice({
  name: "services",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.isLoading = false;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
})


export default serviceSlice.reducer;