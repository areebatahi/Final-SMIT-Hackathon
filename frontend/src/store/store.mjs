import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from './authSlice.mjs'

export const store = configureStore({
  reducer: {
    auth:authReducer
  },
})