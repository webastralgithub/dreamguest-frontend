import { configureStore } from '@reduxjs/toolkit';
import userAuthReducers from '../features/user/userAuth';

export const store = configureStore({
    reducer: {
        userAuth:userAuthReducers
    },
});