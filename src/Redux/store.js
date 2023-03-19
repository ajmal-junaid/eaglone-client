import { configureStore } from "@reduxjs/toolkit";
import categoryFormReducer from './authentication/login';
import lessonFormReducer from './addLesson/addLesson'
export default configureStore({
reducer:{
    categoryForm : categoryFormReducer,
    lessonForm:lessonFormReducer
}
})