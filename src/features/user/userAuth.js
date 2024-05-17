import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';

const initialState = { jwtToken: null, user: {}, isOTPAuthenticated: false, rememberMe: false };

export const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.jwtToken = action.payload.jwtToken;
            state.user = action.payload.user;
            state.isOTPAuthenticated = action.payload.isOTPAuthenticated;
        },
        clearAuth: (state) => {
            state.jwtToken = null;
            state.user = {};
            state.isOTPAuthenticated = false;
            state.shouldRedirectToLogin = true;
            state.rememberMe = false;
            Cookies.remove('loyalty_user_jwtToken');
            Cookies.remove('loyalty_user_userDetails')
        },
        updateRedirection: (state) => {
            state.shouldRedirectToLogin = false;
        },
        setRememberMe: (state) => {
            state.rememberMe = true;
        },
        setjwtAuth: (state) => {
            if (Cookies.get('loyalty_user_jwtToken')) {
                const decodedToken = jwtDecode(Cookies.get('loyalty_user_jwtToken'));
                state.jwtToken = Cookies.get('loyalty_user_jwtToken');
                if (Cookies.get('loyalty_user_rememberMe') === 'false') state.rememberMe = false;
                if (Cookies.get('loyalty_user_rememberMe') === 'true') state.rememberMe = true;
                state.user = JSON.parse(Cookies.get('loyalty_user_userDetails'));
                if (decodedToken.hasVerifiedOTP) {
                    state.isOTPAuthenticated = true;
                }
            }
        }
    }
});

export const { setAuth, setMutliStepAuth, clearAuth, updateRedirection, setRememberMe, setjwtAuth } = userAuthSlice.actions;

export default userAuthSlice.reducer;
