import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBookingServices } from "./bookingServiceApi";
// Initial State
const initialState = {
  bookingServices: null,
  isLoading: false,
  isError: false,
  error: null,
};


export const getBookingServices = createAsyncThunk('services/getBookingServices', async () => {
  const services = await fetchBookingServices()
  return services
});



const serviceSlice = createSlice({
  name: "bookingServices",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getBookingServices.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getBookingServices.fulfilled, (state, action) => {
        state.bookingServices = action.payload;
        state.isLoading = false;
      })
      .addCase(getBookingServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message;
      });
  }
})


export default serviceSlice.reducer;