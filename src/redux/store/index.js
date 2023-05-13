import { configureStore } from '@reduxjs/toolkit'
import adminSlice  from 'redux/reducer/AdminAsyncApi/asyncApi.js'
export const store = configureStore({
  reducer: {
      adminSlice
  },
})