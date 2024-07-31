import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn : false,
    user: null,
    error: null,
    isLoading : false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers:{
        loginRequest : (state) => {
            state.isLoggedIn = false;
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess : (state,action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        loginFailure : (state,action) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.error = null;
        },
       
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout } = loginSlice.actions;

export default loginSlice.reducer