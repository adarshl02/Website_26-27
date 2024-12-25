import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
};

const loadinganderrorSlice = createSlice({
  name: "loadinganderror",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loadingEndsSuccess: (state) => {
        state.error = null;
        state.loading = false;
      },
    loadingEndsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
    loadingStart,
    loadingEndsSuccess,
    loadingEndsFailure
} = loadinganderrorSlice.actions;

export default loadinganderrorSlice.reducer;
