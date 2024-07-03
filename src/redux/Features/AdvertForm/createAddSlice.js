"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    advertName: '',
    tagline: '',
    advertDesc: '',
    numDrivers: '',
    budget: '',
    currency: '',
    hourly: '',
    sticker: '',
};

export const createAddSlice = createSlice({
    name: "createadd",
    initialState,
    reducers: {
        updField: (state, action) => {
            const { field, value }= action.payload;
            return {
                ...state,
                [field]: value,
            };
        },
        clearForm: () => initialState,
    },
});

export const { updField, clearForm } = createAddSlice.actions;
export default createAddSlice.reducer;