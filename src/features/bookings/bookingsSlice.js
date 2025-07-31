import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBookings as fetchBookingsApi,
  addBooking as addBookingApi,
  updateBooking as updateBookingApi,
  deleteBooking as deleteBookingApi,
} from "../../api";


export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBookingsApi();
      if (!response.success) return rejectWithValue(response.message);
      return response.bookings;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await addBookingApi(bookingData);
      if (!response.success) return rejectWithValue(response.message);
      return response.booking;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const updateBooking = createAsyncThunk(
  "bookings/updateBooking",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await updateBookingApi(id, updateData);
      if (!response.success) return rejectWithValue(response.message);
      return response.booking;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const deleteBooking = createAsyncThunk(
  "bookings/deleteBooking",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteBookingApi(id);
      if (!response.success) return rejectWithValue(response.message);
      return id; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearBookingsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch bookings";
      })

      
      .addCase(addBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add booking";
      })

      
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.bookings.findIndex(b => b.id === action.payload.id);
        if (idx !== -1) state.bookings[idx] = action.payload;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update booking";
      })

      
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = state.bookings.filter(b => b.id !== action.payload);
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete booking";
      });
  },
});

export const { clearBookingsError } = bookingsSlice.actions;

export default bookingsSlice.reducer;
