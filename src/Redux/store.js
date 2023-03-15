import { configureStore } from "@reduxjs/toolkit";
import categoryFormReducer from './authentication/login';
export default configureStore({
reducer:{
    categoryForm : categoryFormReducer
}
})