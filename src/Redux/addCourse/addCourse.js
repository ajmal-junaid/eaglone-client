import { createSlice } from "@reduxjs/toolkit";

export const courseFormSlice = createSlice({
    name:'courseForm',
    initialState:{
        value:false
    },
    reducers:{
        setCourseForm:(state)=>{
            state.value = true;
        },
        unSetCourseForm:(state)=>{
            state.value = false;
        }
    }
})

export const {setCourseForm,unSetCourseForm} = courseFormSlice.actions;
export default courseFormSlice.reducer
