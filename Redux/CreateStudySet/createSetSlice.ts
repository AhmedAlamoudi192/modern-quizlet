import { Term } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CreateState {
  name:string
  description:string
}

// Define the initial state using that type
const initialState: CreateState = {
  name:"",
  description:"",
};

export const asyncCreateSet = createAsyncThunk("createStudySet", async (payload,thunkAPI) => {
  const state:any =thunkAPI.getState()
  const body = JSON.stringify(state.createSet)
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}study-set`,{
    method:'POST',
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json'
    },
    body:body
  })
});

export const createSetSlice = createSlice({
  name: "createSet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    controlName:(state,action)=>{
      state.name=action.payload
    },
    controlDescription:(state,action)=>{
      state.description=action.payload
    },
    
  },

});

export const { controlName,controlDescription } =
  createSetSlice.actions;

export default createSetSlice.reducer;
