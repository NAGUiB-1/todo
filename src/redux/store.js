import {configureStore} from '@reduxjs/toolkit'
import TodoSlice from './TodoSlice'
import ThemeSlice from './ThemeSlice'
let store = configureStore({
  reducer:{
    todo: TodoSlice,
    theme: ThemeSlice,
  }
})

export default store