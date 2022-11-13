import { Term } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CardState {
  display: boolean;
  activeTerm: number;
  activeRight: boolean;
  activeLeft: boolean;
  Terms: Term[];
}

// Define the initial state using that type
const initialState: CardState = {
  display: false,
  activeTerm: 0,
  activeRight: false,
  activeLeft: false,
  Terms: [],
};

export const cardSlice = createSlice({
  name: "card",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCardState: (state, action) => {
      state.Terms = action.payload.Terms;
      if (state.Terms.length > 1) state.activeRight = true;
      state.activeTerm = 0;
    },
    switchRight: (state) => {
      if (state.activeTerm < state.Terms.length-1)
        state.activeTerm = state.activeTerm + 1;
      if (state.activeTerm == 0){ state.activeLeft = false,state.activeRight = true}
      else if (state.activeTerm == state.Terms.length - 1)
        {state.activeRight = false,state.activeLeft = true}
      else {state.activeLeft = true, state.activeRight = true}
    },
    switchLeft: (state) => {
      if (state.activeTerm > 0) state.activeTerm = state.activeTerm - 1;
      if (state.activeTerm == 0) {state.activeLeft = false,state.activeRight = true}
      else if (state.activeTerm == state.Terms.length - 1)
        {state.activeRight = false,state.activeLeft = true}
      else {state.activeLeft = true, state.activeRight = true}
    },
    switchDiplay: (state) => {
      state.display = !state.display;
    },
  },

});

export const { setCardState, switchDiplay, switchLeft, switchRight } =
  cardSlice.actions;

export default cardSlice.reducer;
