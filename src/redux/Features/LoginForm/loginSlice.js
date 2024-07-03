"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    password: '',
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value }= action.payload;
            return {
                ...state,
                [field]: value,
            };
        },
        clearForm: () => initialState,
    },
});

export const { updateField, clearForm } = loginSlice.actions;
export default loginSlice.reducer;