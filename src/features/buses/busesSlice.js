import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBuses as fetchBusesApi } from "../../api";


export const fetchBuses = createAsyncThunk(
  "buses/fetchBuses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchBusesApi();
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response.buses;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);



const busesSlice = createSlice({
  name: "buses",
  initialState: {
    buses: [],
    loading: false,
    error: null,
  },
  reducers: {
    
    decrementSeatAvailability(state, action) {
      const busId = action.payload;
      const bus = state.buses.find((b) => b.id === busId);
      if (bus && bus.availableSeats > 0) {
        bus.availableSeats -= 1;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.loading = false;
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch buses";
      });
  },
});

export const { decrementSeatAvailability } = busesSlice.actions;
export default busesSlice.reducer;
