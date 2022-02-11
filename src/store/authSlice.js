import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    errorMessage: "",
  },
  reducers: {
    add_error: (state, action) => {
      state.errorMessage = action.payload;
    },
    signin: (state, action) => {
      state.errorMessage = "";
      state.token = action.payload;
    },
    clear_err_message: (state) => {
      state.errorMessage = "";
    },
    signout: (state) => {
      state.errorMessage = "";
      state.token = null;
    },
  },
});

export const { add_error, signin, clear_err_message, signout } = authSlice.actions;


export default authSlice.reducer;