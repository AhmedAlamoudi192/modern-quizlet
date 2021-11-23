import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface term {
  name: string;
  definition: string;
  studySetId: number;
  id?: number;
}

// Define the initial state using that type
const initialState: term[] = [
  {
    name: "",
    definition: "",
    studySetId: 0,
  },
];

export const asyncCreateTerm = createAsyncThunk(
  "createTerm",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const body = JSON.stringify(state.createTerm);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}term`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
  }
);

export const asyncUpdateTerm = createAsyncThunk(
  "updateTerm",
  async (_, thunkAPI) => {
    const state: any = thunkAPI.getState();
    const id = state.createTerm[0].studySetId;
    const body = JSON.stringify(state.createTerm);
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}term/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
  }
);

export const asyncDeleteTerm = createAsyncThunk(
  "deleteTerm",
  async (id: number, thunkAPI) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}term/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })    
  }
);

export const asyncDeleteSet = createAsyncThunk(
  "deleteTerm",
  async (id: number, thunkAPI) => {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}study-set/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })    
  }
);

export const createTermSlice = createSlice({
  name: "createTerm",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setId: (state, action) => {
      const id = action.payload;
      const init = [
        {
          name: "",
          definition: "",
          studySetId: id,
          id:id,
        },
      ];
      return init;
    },
    setTermState: (state, action) => {
      return action.payload;
    },
    controlName: (state, action) => {
      const { index, input } = action.payload;
      state[index].name = input;
    },
    controlDefinition: (state, action) => {
      const { index, input } = action.payload;
      state[index].definition = input;
    },
    pushTerm: (state) => {
      state.push({ name: "", definition: "", studySetId: state[0].studySetId });
    },
    popTerm: (state, action) => {
      if (state.length != 1) {
        const { index } = action.payload;
        state.splice(index, 1);
      }
    },
    moveTerm: (state, action) => {
      const { index, up } = action.payload;
      if (up && index != 0)
        state.splice(index - 1, 0, state.splice(index, 1)[0]);
      if (!up && index != state.length - 1)
        state.splice(index + 1, 0, state.splice(index, 1)[0]);
    },
  },
});

export const {
  setTermState,
  moveTerm,
  controlName,
  controlDefinition,
  setId,
  pushTerm,
  popTerm,
} = createTermSlice.actions;

export default createTermSlice.reducer;
