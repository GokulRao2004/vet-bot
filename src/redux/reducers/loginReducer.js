import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn : false,
    user: null,
    error: null,
    isLoading : false,
    newUser:false,
    isPhoneNumberExists: false, 
    isWaitingForPhoneToLoad: false, 
    errorPhoneNumberCheck: null,
    isPasswordExists: false
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
        checkPhoneNumber: (state,action) => {
            state.isWaitingForPhoneToLoad = true;
            state.errorPhoneNumberCheck = null;
            state.newUser = false;
            // Resets


        },
        checkPhoneNumberSuccess: (state,action) => {
            state.isWaitingForPhoneToLoad = false;
            state.isPhoneNumberExists = action.payload;
            state.errorPhoneNumberCheck = null;
            state.isPasswordExists = false;
        },
        checkPasswordExists: (state,action) =>{
            state.isPasswordExists = action.payload;
            state.newUser = !action.payload;
        },
        checkPhoneNumberFailure: (state,action) => {
            state.isWaitingForPhoneToLoad = false;
            state.isPhoneNumberExists = false;
            state.isPasswordExists = false;
            state.errorPhoneNumberCheck = action.payload;
        }
    }
})

export const { loginRequest, loginSuccess, loginFailure, logout , checkPhoneNumber,checkPhoneNumberFailure,checkPhoneNumberSuccess, checkPasswordExists} = loginSlice.actions;

export default loginSlice.reducer