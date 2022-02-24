import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import chapterSlice from "./chapterSlice";
import noteSlice from './noteSlice';

const store = configureStore({
    reducer: { 
        auth: authReducer,
        book: bookReducer,
        chapter: chapterSlice,
        note: noteSlice
    }
});

export default store;