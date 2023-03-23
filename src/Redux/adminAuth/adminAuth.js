import { createSlice } from "@reduxjs/toolkit";

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        value: false

    },
    reducers: {
        setAdmin: (state) => {
            state.value = true;
        },
        unSetAdmin: (state) => {
            state.value = false;
        }
    }
})

export const { setAdmin, unSetAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer