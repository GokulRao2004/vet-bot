import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn : false,
    user: null,
    username: null,
    error: null,
    isLoading : false,
    isLoggedIntoWhatsapp: false
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
            state.isLoggedIntoWhatsapp = true
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
        whatsappLogin : (state) => {
            state.isLoggedIntoWhatsapp = true
        },
        addUserId : (state,action) => {
            state.user = action.payload
            state.isLoggedIntoWhatsapp = true
        },
        addUserName : (state,action) => {
            state.username = action.payload
        }
    }
})

export const { loginRequest, loginSuccess,addUserName , loginFailure, logout, whatsappLogin,addUserId} = loginSlice.actions;

export default loginSlice.reducer