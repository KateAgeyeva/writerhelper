import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    fetch_books: (state, action) => {
      state = action.payload;
      return state;
    }
  },
});

export const { fetch_books } = bookSlice.actions;


export default bookSlice.reducer;