import { configureStore } from "@reduxjs/toolkit";
import categoryFormReducer from './addCategory/addCategory';
import lessonFormReducer from './addLesson/addLesson';
import courseFormReducer from './addCourse/addCourse';
import userDataReducer from './userData/userData'
export default configureStore({
reducer:{
    categoryForm : categoryFormReducer,
    lessonForm:lessonFormReducer,
    courseForm:courseFormReducer,
    userData:userDataReducer
}
})