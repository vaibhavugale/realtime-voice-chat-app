import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../Store/Slices/user-slices"
import activationSlice from "../Store/Slices/activation-slice"

const store = configureStore({
  reducer: {
 
    authSlice:authSlice,
    activationSlice:activationSlice
  },
});

export default store;