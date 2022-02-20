import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    fetch_chapters: (state, action) => {
      state = action.payload;
      return state;
    },
    delete_chapter: (state, action) => {
      state = state.filter((t) => t._id !== action.payload)
      return state;
    }
  },
});

export const { fetch_chapters, delete_chapter } = chapterSlice.actions;


export default chapterSlice.reducer;