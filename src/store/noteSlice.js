import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const noteSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    fetch_notes: (state, action) => {
      state = action.payload;
      return state;
    },
    delete_note: (state, action) => {
      state = state.filter((t) => t._id !== action.payload)
      return state;
    }
  },
});

export const { fetch_notes, delete_note } = noteSlice.actions;


export default noteSlice.reducer;