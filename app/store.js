import { configureStore } from '@reduxjs/toolkit'
import film from '../store/film'

export const store = configureStore({
  reducer: {
    film
  },
})

export default store