import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from '@redux-state/Navbar/navbarSlice'
import registerationReducer from '@redux-state/Registerationform/registerationSlice'
import cardReducer from '@redux-state/Cards/cardSlice'
import createSetReducer from '@redux-state/CreateStudySet/createSetSlice'
import createTermReducer from '@redux-state/createTerm/createterm'

export const store = configureStore({
    // this is where you add reducers in key:value pair, like users:usersReducer
  reducer: {
    navbar:navbarReducer,
    registeration:registerationReducer,
    card:cardReducer,
    createSet:createSetReducer,
    createTerm:createTermReducer,
  },

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch