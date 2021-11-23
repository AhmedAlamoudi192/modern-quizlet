import React, { ReactElement } from "react";
import Link from "next/link";
import Head from "next/head"
import UnderLinedIF from "@components/UnderLinedInputField"
import { useAppDispatch, useAppSelector } from "@redux-state/app/hooks";
import { asyncCreateSet, controlDescription, controlName } from "@redux-state/CreateStudySet/createSetSlice";

interface Props {}



export default function index({}: Props): ReactElement {
    const dispatch = useAppDispatch()
    const {name,description} = useAppSelector(state => state.createSet)
  return (
    <main className="flex flex-col items-center justify-start h-screen bg-primary-dark w-full flex-1 px-5 lg:px-20 text-center">
      <Head>
        <title>Create Study Set</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" flex text-white justify-between items-start text-3xl mt-5 p-5 font-bold w-full">
        <div className="flex flex-col items-start ">
        <h1 className="mb-2 ml-2" >create a new set</h1>
        <UnderLinedIF label={"title"} onChange={(event)=>dispatch(controlName(event.target.value))} value={name}/>
        <UnderLinedIF label={"description"} onChange={(event)=>dispatch(controlDescription(event.target.value))} value={description} />
        </div>
        <Link href={`study-set/`}>
          <button onClick={()=>{dispatch(asyncCreateSet())}} className="text-lg h-16 w-36 text-white font-bold px-2 rounded bg-footer hover:bg-primary transition-colors  ">
            create
          </button>
        </Link>
      </div>

    </main>
  );
}
