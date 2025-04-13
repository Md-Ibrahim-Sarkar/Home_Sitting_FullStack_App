import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userSlice";
import serviceSlice from "../features/services/serviceSlice";
import bookingSlice from "../features/bookingServices/bookingSlice";
import favoritesSlice from "../features/favorites/favoriteSlice";



const store = configureStore({
  reducer: {
    user: userSlice,
    services: serviceSlice,
    bookingServices: bookingSlice,
    favorites: favoritesSlice
  }
})

export default store;