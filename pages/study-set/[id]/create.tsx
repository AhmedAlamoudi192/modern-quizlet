import React, { ReactElement, useEffect } from "react";
import Head from "next/head"
import UnderLinedIF from "@components/UnderLinedInputField"
import BigButton from "@components/BigButton";
import { useAppDispatch, useAppSelector } from "@redux-state/app/hooks";
import { setId, controlDefinition, controlName, pushTerm, popTerm, moveTerm, asyncCreateTerm } from "@redux-state/createTerm/createterm";
import router from "next/router";

interface Props {
    id:number
}



export default function index({id}: Props): ReactElement {
    
    useEffect(() => {
        dispatch(setId(id))
        
    }, [])

    const dispatch = useAppDispatch()
    const terms = useAppSelector(state => state.createTerm)
  return (
    <main className="flex flex-col items-center justify-start h-full min-h-screen bg-primary-dark w-full flex-1 px-5 lg:px-20 text-center">
      <Head>
        <title>Create a Term</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-3xl mt-5 p-5 font-bold" >Create Terms</h1>
        <BigButton label={'create'} onClick={()=>dispatch(asyncCreateTerm()).then((res)=>router.back())} />
          </div>
        <div className=" grid grid-cols-1 text-white border-t-2 justify-between items-center text-3xl mt-5 p-5 font-bold w-full">
        {terms.map((item, index) => (
            <div className="flex gap-6" key={index}>
            <UnderLinedIF label={"term"} onChange={(e)=>dispatch(controlName({index:index,input:e.target.value}))} value={terms[index].name}/>
            <UnderLinedIF label={"definition"} onChange={(e)=>dispatch(controlDefinition({index:index,input:e.target.value}))} value={terms[index].definition} />
            <BigButton label="Delete" onClick={()=>dispatch(popTerm({index:index}))} />
            <BigButton label="Up" onClick={()=>dispatch(moveTerm({index:index,up:true}))} />
            <BigButton label="Down" onClick={()=>dispatch(moveTerm({index:index,up:false}))} />
            </div>
        ))}
        <BigButton label={'create another term'} onClick={()=>dispatch(pushTerm())} />
      </div>
            
    </main>
  );
}

export async function getServerSideProps(context) {
    const { id } = context.query;

    return { props: { id } };
  }