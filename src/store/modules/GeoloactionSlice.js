import { createSlice } from "@reduxjs/toolkit";

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: {
    location: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload; // Update the location in the state
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setLocation, setLoading, setError } = geolocationSlice.actions;
export const geolocationReducer = geolocationSlice.reducer;
