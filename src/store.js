import { configureStore } from "@reduxjs/toolkit";
import mainReducer, { uploadFile } from "./screens/main.slice";

const nonSerializableActions = [uploadFile];

const store = configureStore({
    reducer: {
        main: mainReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        //serializableCheck: false
        serializableCheck: {
            ignoredActions: [...nonSerializableActions],
        },
    }),
});

export default store;
