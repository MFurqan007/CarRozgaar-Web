"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: "Dashboard",
};

export const sidebarSlice = createSlice({
    name: "sidebar",
    initialState,
    reducers: {
        tabChange: (state, action) =>{
            state.value = action.payload;
        },
    },
});

export const {tabChange} = sidebarSlice.actions;
export default sidebarSlice.reducer;