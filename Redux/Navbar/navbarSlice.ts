import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@redux-state/app/store'

// Define a type for the slice state
interface NavbarState {
  menuState: boolean;
  authenticated:boolean;
}

// Define the initial state using that type
const initialState: NavbarState = {
    menuState: false,
    authenticated:false
}

export const navbarSlice = createSlice({
  name: 'navbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state) => {
      state.menuState = !state.menuState
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { toggle } = navbarSlice.actions

export default navbarSlice.reducer