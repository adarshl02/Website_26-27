import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ongoing: null,
  past: null,
  minipratibimb: null,
  flagship: null,
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
    pastStart: (state) => {
      state.loading = true;
    },
    pastSuccess: (state, action) => {
      state.past = action.payload;
      state.loading = false;
      state.error = null;
    },
    pastFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    minipratibimbStart: (state) => {
      state.loading = true;
    },
    minipratibimbSuccess: (state, action) => {
      state.minipratibimb = action.payload;
      state.loading = false;
      state.error = null;
    },
    minipratibimbFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    flagshipStart: (state) => {
      state.loading = true;
    },
    flagshipSuccess: (state, action) => {
      state.flagship = action.payload;
      state.loading = false;
      state.error = null;
    },
    flagshipFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteEvents: (state) => {
      state.ongoing = null;
      state.past = null;
      state.flagship = null;
      state.minipratibimb = null;
    },
  },
});

export const {
  ongoingStart,
  ongoingSuccess,
  ongoingFailure,
  pastStart,
  pastSuccess,
  pastFailure,
  minipratibimbStart,
  minipratibimbSuccess,
  minipratibimbFailure,
  flagshipStart,
  flagshipSuccess,
  flagshipFailure,
  deleteEvents,
} = eventsSlice.actions;

export default eventsSlice.reducer;
