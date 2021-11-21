import { configureStore } from '@reduxjs/toolkit'
import navbarReducer from '@redux-state/Navbar/navbarSlice'

export const store = configureStore({
    // this is where you add reducers in key:value pair, like users:usersReducer
  reducer: {
    navbar:navbarReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch