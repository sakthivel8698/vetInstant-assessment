import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";
import config from "../../config/config";

export const loginUser = createAsyncThunk(
    "auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await API.post(config.ENDPOINTS.LOGIN, data);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, loading: false },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                localStorage.setItem("token", action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;  
            });
    },
});

export default authSlice.reducer;