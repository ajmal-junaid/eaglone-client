import { createSlice } from "@reduxjs/toolkit";

export const lessonFormSlice = createSlice({
    name:'lessonForm',
    initialState:{
        value:false
    },
    reducers:{
        setLessonForm:(state)=>{
            state.value = true;
        },
        unSetLessonForm:(state)=>{
            state.value = false;
        }
    }
})

export const {setLessonForm,unSetLessonForm} = lessonFormSlice.actions;
export default lessonFormSlice.reducer
