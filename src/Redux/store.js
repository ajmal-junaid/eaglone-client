import { configureStore } from "@reduxjs/toolkit";
import loginFormReducer from './authentication/login';
export default configureStore({
reducer:{
    loginForm : loginFormReducer
}
})