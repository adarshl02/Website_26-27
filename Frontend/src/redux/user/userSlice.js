import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart : (state)=>{
      state.loading = true;
    },
    signOutSuccess : (state,action) => {
      state.currentUser = null;
      state.token = null,
      state.loading = false;
      state.error = null;
      },
      signOutFailure : (state,action) => {
        state.error = action.payload;
        state.loading = false;
      },
      updateIsArtist: (state, action) => {
        if (state.currentUser) {
          state.currentUser.rest.is_artist = action.payload;
        }
      },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  updateIsArtist
} = userSlice.actions;

export default userSlice.reducer;
