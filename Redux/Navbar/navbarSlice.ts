import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface NavbarState {
  menuState: boolean;
}

// Define the initial state using that type
const initialState: NavbarState = {
    menuState: false,
}

export const navbarSlice = createSlice({
  name: 'navbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggle: (state) => {
      state.menuState = !state.menuState
    },
  },
})

export const { toggle } = navbarSlice.actions

export default navbarSlice.reducer