"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userUid: '',
};

export const currentUserSlice = createSlice({
    name: "currentUser",
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

export const { updateField, clearForm } = currentUserSlice.actions;
export default currentUserSlice.reducer;