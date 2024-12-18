import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ongoing: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    ongoingStart: (state) => {
      state.loading = true;
    },
    ongoingSuccess: (state, action) => {
      state.ongoing = action.payload;
      state.loading = false;
      state.error = null;
    },
    ongoingFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteEvents: (state) => {
      state.ongoing = null;
    },
  },
});

export const {
  ongoingStart,
  ongoingSuccess,
  ongoingFailure,
  deleteEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
