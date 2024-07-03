'use client';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sidebarReducer from './Features/Sidebar/sidebarSlice';
import signupSlice from "./Features/SignUpForm/signupSlice";
import loginSlice from "./Features/LoginForm/loginSlice";
import createAddSlice from "./Features/AdvertForm/createAddSlice"
import currentUserSlice from "./Features/CurrentUser/currentUser"

const rootReducer = combineReducers({
    sidebar: sidebarReducer,
    signup: signupSlice,
    login: loginSlice,
    createadd: createAddSlice, 
    currentUser: currentUserSlice,
    // add all other reducers
},);

export const store = configureStore({
    reducer: rootReducer,
});