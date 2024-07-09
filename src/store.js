import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./screens/main.slice";

const store = configureStore({
    reducer: {
        main: mainReducer
    }
});

export default store;
