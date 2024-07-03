"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    email: '',
    password: '',
    address: '',
    contact: '',
};

export const signupSlice = createSlice({
    name: "signup",
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

export const { updateField, clearForm } = signupSlice.actions;
export default signupSlice.reducer;