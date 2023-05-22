import { createSlice } from "@reduxjs/toolkit";

const pexelsSlice = createSlice({
  name: "PexelImg",
  initialState: {
    img: null,
    query: null,
  },
  reducers: {
    setImg: (state, action) => {
      state.img = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setImg, setQuery } = pexelsSlice.actions;
export const pexelsReducer = pexelsSlice.reducer;
