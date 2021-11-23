import { Session } from '@supabase/supabase-js';
import { supabase } from "@helperInstances/supabaseClient"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface FormState {
  email: string;
  password: string;
  confirmpassword?: string;
}

interface authState{
    authenticated:boolean
}
// Define the initial state using that type
const initialState:authState = {
    authenticated:false
};

// dealing with supabase's client.
export const asyncSignUp = createAsyncThunk("supabaseSignup", async (payload:FormState) => {
    const {email,password,confirmpassword} = payload
    if(password!=confirmpassword){
        throw Error('please make sure the passwords match')
    }
    const {user,session,error} = await supabase.auth.signUp({email:email,password:password})
    return session as Session;
});

export const asyncLogin = createAsyncThunk("supabaseLogin", async (payload:FormState) => {
    const {email,password} = payload

    const {user,session,error} = await supabase.auth.signIn({email:email,password:password})
    return session as Session;
});

export const asyncLogout = createAsyncThunk("supabaseLogout", async () => {
    const {error} = await supabase.auth.signOut()
    if(error)
    return error

    return
});

export const registerationSlice = createSlice({
  name: "registeration",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
      toggleAuth:(state,{payload}) => {
        state.authenticated = payload
      }
  },
  // make them available as actions
  extraReducers: (builder)=> {
    builder.addCase(asyncSignUp.fulfilled,(state,action) =>{
    }),
    builder.addCase(asyncLogin.fulfilled,(state,action) =>{
    })
    builder.addCase(asyncLogout.fulfilled,(state) =>{
    })
  },
});

export const { toggleAuth } = registerationSlice.actions;

export default registerationSlice.reducer;
