import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import petReducer from "../features/pets/petSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petReducer,
  },
});