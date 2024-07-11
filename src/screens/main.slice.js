import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../configurations/axios";

const initialState = {
    main: [],
    status: 'idle',
    error: null,
}

export const uploadFile = createAsyncThunk('uploadFile', async ({ base64file }, thunkAPI) => {
    try {
        const response = await axiosInstance.post(`/`, { file: base64file });
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: { },
    extraReducers: builder => {
        builder.addCase(uploadFile.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.status = 'successful';
            //state.paymentTypes.push(...action.payload);
        });
        builder.addCase(uploadFile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

//export const { list } = paymentTypesSlice.actions;

export default mainSlice.reducer;
