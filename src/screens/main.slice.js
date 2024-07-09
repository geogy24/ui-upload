import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../configurations/axios";

const initialState = {
    main: [],
    status: 'idle',
    error: null,
}

export const uploadFile = createAsyncThunk('uploadFile', async (file, thunkAPI) => {
    try {
        console.log(JSON.stringify(file));
        //const response = await axiosInstance.post(`/`);
        //return response.data;
        return thunkAPI.abort("nothing to do with that");
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
            //state.error = action.error.message;
        });
    },
});

//export const { list } = paymentTypesSlice.actions;

export default mainSlice.reducer;
