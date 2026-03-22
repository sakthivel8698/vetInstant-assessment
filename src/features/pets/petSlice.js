import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const createPet = createAsyncThunk(
  "pets/create",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/clinic/user/135943/pet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // ← explicit override
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.resourceName || "Register failed");
    }
  }
);

export const fetchUserDetails = createAsyncThunk(
  "pets/fetchUserDetails",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/clinic/doctor/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user details");
    }
  }
);


export const fetchPets = createAsyncThunk(
  "pets/fetch",
  async (filters, { rejectWithValue }) => {
    try {
      const res = await API.post(`/clinic/pets-list`, filters);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch pets details");
    }
  }
);

export const updateStatus = createAsyncThunk(
  "pets/update",
  async ({ id, status }, { rejectWithValue }) => {
    // await API.put(`/pet/${id}/update?status=${status}`);
    // return { id, status };
    try {
      const res = await API.put(`/pet/${id}/update?status=${status}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update pets status");
    }

  }
);

const petSlice = createSlice({
  name: "pets",
  initialState: {
    list: [],
    loading: false,
    userDetails: null,
    userLoading: false,
    totalCount: 0, 
    currentPage: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.list = action.payload.data;
        state.totalCount = action.payload?.totalRecords || action.payload?.totalRecords || 0;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userDetails = action.payload.data;
      })
      .addCase(fetchUserDetails.rejected, (state) => {
        state.userLoading = false;
      });
  },
});

export default petSlice.reducer;