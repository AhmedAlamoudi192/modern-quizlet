import React, { MouseEventHandler, ReactElement, useEffect } from "react";
import Link from 'next/link'
import { toggle } from "@redux-state/Navbar/navbarSlice"
import { useAppDispatch, useAppSelector } from "@redux-state/app/hooks";
import { RootState } from "@redux-state/app/store";
import { asyncLogout, toggleAuth } from "@redux-state/Registerationform/registerationSlice";
import { supabase } from "@helperInstances/supabaseClient";
import router from "next/router";
import Head from 'next/head'


interface Props {
  name: string;
  url: string;
  className?:string;
  onClick?:MouseEventHandler;
}

const menuIcon=<svg fill="none" height="21" viewBox="0 0 37 21" width="37" xmlns="http://www.w3.org/2000/svg"><path d="M27.6466 1.01497C26.1048 0.91492 24.5722 1.17646 23.1462 1.76712C21.7208 2.35779 20.4526 3.26725 19.4418 4.42511C18.4311 5.58298 17.703 6.95614 17.3172 8.43832C16.9314 9.9205 16.897 11.4717 17.2169 12.969C17.5367 14.4671 18.2031 15.8706 19.162 17.0706C20.1215 18.2705 21.3477 19.2345 22.7463 19.8859C24.1443 20.538 25.6755 20.8595 27.2201 20.8271C28.7647 20.794 30.2805 20.4076 31.6497 19.6968C31.6932 19.6747 31.7423 19.6644 31.7914 19.6672C31.8405 19.6699 31.8882 19.6851 31.9289 19.712C32.2193 19.9038 32.5223 20.0757 32.8358 20.2268C33.9224 20.7477 35.1155 21.012 36.322 20.9996C36.3964 20.9996 36.4672 20.9706 36.5198 20.9189C36.5724 20.8671 36.6019 20.7967 36.6019 20.7229V17.3583C36.6026 17.2921 36.5801 17.2286 36.5373 17.1775C36.4946 17.1265 36.4356 17.0927 36.3697 17.0816C36.0484 17.0312 35.7342 16.9422 35.4347 16.816C35.3975 16.7994 35.3645 16.7759 35.3379 16.7456C35.3112 16.7152 35.2916 16.68 35.2804 16.6414C35.2691 16.6027 35.2663 16.5627 35.272 16.5227C35.2776 16.4834 35.2923 16.4454 35.314 16.4116C36.2897 14.9646 36.8642 13.2885 36.9786 11.5524C37.0936 9.81631 36.7443 8.08019 35.9671 6.51935C35.1899 4.95851 34.0122 3.62882 32.5511 2.66209C31.0907 1.69605 29.3988 1.12745 27.6466 1.01497ZM20.9506 10.9155C20.9492 9.72798 21.3035 8.56597 21.9684 7.57785C22.6334 6.58973 23.5796 5.81897 24.6865 5.36355C25.7934 4.90813 27.0125 4.78876 28.1881 5.01992C29.3637 5.25108 30.4439 5.82311 31.292 6.66219C32.14 7.50195 32.7173 8.57218 32.9509 9.73695C33.1852 10.9017 33.0645 12.1093 32.6058 13.2071C32.147 14.3043 31.3698 15.242 30.3724 15.9017C29.3756 16.5613 28.2035 16.9126 27.0048 16.9119C25.3992 16.9119 23.8588 16.2805 22.7232 15.1557C21.5875 14.031 20.9478 12.506 20.9464 10.9148L20.9506 10.9155Z" fill="white"></path><rect fill="white" height="3" rx="1.5" width="14" y="2"></rect><rect fill="white" height="3" rx="1.5" width="10" y="9"></rect><rect fill="white" height="3" rx="1.5" width="13" y="16"></rect></svg>

const NavLink = ({ name, url }: Props): ReactElement => {
  return (
    <div className="block mt-2 lg:inline-block lg:mt-2 font-bold border-b-4 rounded border-transparent transition-all hover:border-white text-white mr-4 " >
    <Link
      href={url}
    >
      {name}
    </Link>
    </div>
  );
};

const NavButton = ({ name, url,className, onClick }: Props): ReactElement => {
  return (
    <Link
      href={url}
    >
    <div onClick={onClick} className={` cursor-pointer inline-block text-sm px-4 py-2 leading-none border text-black font-bold rounded transition-colors mb-2 border-transparent lg:mt-0 ${className} `} >
      {name}
    </div>
    </Link>
  );
};

export default function NavBar(): ReactElement {

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // set cookie
      fetch(process.env.NEXT_PUBLIC_BASE_URL+'auth', {  
        method:'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      })

      if (event === 'SIGNED_IN'){
      dispatch(toggleAuth(true))
      router.push("/account")
      }
      if (event === 'SIGNED_OUT'){
        dispatch(toggleAuth(false))
        router.push('/')
      }
    })

    //update state on refresh
    
    fetch(process.env.NEXT_PUBLIC_BASE_URL+'get-user').then((res)=>{
      if (res.status===200||304)
      dispatch(toggleAuth(true))
      if(res.status===401)
      dispatch(toggleAuth(false))
    })
    
    return () => {
      authListener.unsubscribe()
    }
    
  }, [])
  
  
  const { menuState } = useAppSelector((state:RootState) => state.navbar)
  const { authenticated } = useAppSelector((state:RootState)=> state.registeration)
  const dispatch = useAppDispatch()

  return (  
    <nav className="flex items-center justify-between flex-wrap bg-primary p-6">
      <div className=" hidden lg:block font-semibold text-3xl text-white tracking-tight mr-6">
        <Link href="/">Quizlet</Link>
      </div>
        
      <div className=" flex flex-grow items-start lg:items-center w-auto">
        <div className="flex text-sm order-last ">
        <form className="hidden lg:block" role={"search"} >
        <input className="mr-4 rounded-lg h-7 p-4 bg-formbg truncate"  placeholder="Study sets, textbooks, questions" />
        </form>
        {authenticated?
        <> <NavButton name="Logout" url="/" onClick={()=>dispatch(asyncLogout())} className="bg-red-900  hover:bg-red-700" /> </>:
        <>
        <NavLink name="Login" url="/login" />
          <NavButton name="Signup" url="/sign-up" className="bg-yellow-300  hover:bg-yellow-400" />
          </>}
        </div>
        <div className=" flex flex-col lg:flex-row text-sm flex-grow">
        <button className="lg:hidden" onClick={()=>dispatch(toggle())} >{menuIcon}</button>
          <div className={` ${menuState?"block":"hidden"} transition-all lg:block`} >
          <NavLink name="Home" url="/" />
          <NavLink name="Subjects" url="/" />
          <NavLink name="Explanations" url="/" />
          <NavButton name="Account" url="/account" className="bg-blue-400 hover:bg-blue-500 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}