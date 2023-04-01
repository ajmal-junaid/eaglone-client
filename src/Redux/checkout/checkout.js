import { createSlice } from "@reduxjs/toolkit";

export const checkoutSlice = createSlice({
    name:"checkout",
    initialState:{
        value:{total:67676}
    },
    reducers:{
        setCheckout:(state,action)=>{
            state.value=action.payload.checkout
        }
    }
})

export const {setCheckout} = checkoutSlice.actions;
export default checkoutSlice.reducer