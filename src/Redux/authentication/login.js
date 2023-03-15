import { createSlice } from "@reduxjs/toolkit";

export const categoryFormSlice = createSlice({
    name: "loginForm",
    initialState: {
        value: false
    },
    reducers: {
        setCategoryForm: (state) => {
            state.value = true;
        },
        unSetCategoryForm:(state)=>{
            state.value = false;
        }
    }
})

export const { setCategoryForm,unSetCategoryForm } = categoryFormSlice.actions;
export default categoryFormSlice.reducer