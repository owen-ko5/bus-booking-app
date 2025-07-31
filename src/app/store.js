import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import busesReducer from "../features/buses/busesSlice";
import bookingsReducer from "../features/bookings/bookingsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    buses: busesReducer,
    bookings: bookingsReducer,
   
  },
  // Optional: you can customize middleware or devTools here
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  // devTools: process.env.NODE_ENV !== 'production',
});

export default store;
