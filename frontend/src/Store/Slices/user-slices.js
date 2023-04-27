import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isAuth:false,
    user:null,
    otp:{
        phone:'',
        hash:''
    }
}
 const  authSlice = createSlice({
    name:'auth',
    initialState:initialState,
    reducers:{
        setAuth:(state,actions)=>{
            const { user } = actions.payload;
            state.user = user;
            state.isAuth = true;
        },
        setOtp:(state,action)=>{
            const {phone,hash} = action.payload;
         
            state.otp.phone = phone 
            state.otp.hash = hash 
          
        }
    }
});
export const { setAuth ,setOtp} = authSlice.actions;

export default authSlice.reducer;
