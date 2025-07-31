import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, register as registerApi } from "../../api";


export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginApi(credentials);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const register = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await registerApi(formData);
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        
      })
      
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;

export default authSlice.reducer;
