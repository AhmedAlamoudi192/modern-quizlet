import React, { ReactElement } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@redux-state/app/hooks'
import { asyncLogin } from '@redux-state/Registerationform/registerationSlice'
import router, { Router } from 'next/router'
import { RootState } from '@redux-state/app/store'
import InputField from "@components/InputField";

interface Props {
    
}


export default function login({}: Props): ReactElement {
    const dispatch = useAppDispatch();
    const { authenticated } = useAppSelector((state:RootState)=> state.registeration)
    const handleSubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      
      await dispatch(
        asyncLogin({
          email: target.email.value,
          password: target.password.value,
        })
      );
    };
    return (
        <div>
        <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-5 lg:px-20 text-center" >
        <button className='flex items-center py-4 px-16 my-10 bg-yellow-500 text-lg font-bold text-white rounded hover:bg-yellow-400 transition-colors ' > <div className='bg-google-icon w-10 h-10 mr-2'/> Login with Google</button>
        <form className='bg-white shadow-md rounded md:w-1/2 px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <InputField label="email" type="email" placeholder="enter your email" />
        <InputField label="password" type="password" placeholder="must be at least 8 chars"/>
        <div className="flex items-center mt-10 justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors" type="submit">
        Login
      </button>
      <div className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors" >
      <Link href="/sign-up" >Don't have an account ?</Link>
      </div>
    </div>
    </form>
      </main>
        </div>
    )
}
