import { configureStore } from "@reduxjs/toolkit";
import categoryFormReducer from './addCategory/addCategory';
import lessonFormReducer from './addLesson/addLesson';
import courseFormReducer from './addCourse/addCourse';
import userDataReducer from './userData/userData';
import adminAuthReducer from './adminAuth/adminAuth';
import checkoutReducer from './checkout/checkout'
export default configureStore({
reducer:{
    categoryForm : categoryFormReducer,
    lessonForm:lessonFormReducer,
    courseForm:courseFormReducer,
    userData:userDataReducer,
    adminAuth:adminAuthReducer,
    checkout:checkoutReducer
}
})