import { configureStore } from "@reduxjs/toolkit";
import categoryFormReducer from './addCategory/addCategory';
import lessonFormReducer from './addLesson/addLesson';
import courseFormReducer from './addCourse/addCourse'
export default configureStore({
reducer:{
    categoryForm : categoryFormReducer,
    lessonForm:lessonFormReducer,
    courseForm:courseFormReducer
}
})