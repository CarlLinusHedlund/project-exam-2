import { createSlice } from "@reduxjs/toolkit";

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState: {
    location: {
      country: null,
      city: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location.country = action.payload.country;
      state.location.city = action.payload.city;
    },
    // setLoading: (state, action) => {
    //   state.isLoading = action.payload;
    // },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setLocation, setLoading, setError } = geolocationSlice.actions;
export const geolocationReducer = geolocationSlice.reducer;
