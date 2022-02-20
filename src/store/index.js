import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import chapterSlice from "./chapterSlice";

const store = configureStore({
    reducer: { 
        auth: authReducer,
        book: bookReducer,
        chapter: chapterSlice
    }
});

export default store;