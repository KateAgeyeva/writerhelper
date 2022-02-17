import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import chapterSlice from "./chaptersSlice";

const store = configureStore({
    reducer: { 
        auth: authReducer,
        book: bookReducer,
        chapter: chapterSlice
    }
});

export default store;