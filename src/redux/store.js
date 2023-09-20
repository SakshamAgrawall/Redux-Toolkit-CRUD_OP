import { configureStore } from "@reduxjs/toolkit";
import PostReducer from "../redux/feature/PostSlice";

export default configureStore({
    reducer: {
        app: PostReducer,
    },
});