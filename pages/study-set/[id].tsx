import prisma from "@helperInstances/prisma";
import { Term } from "@prisma/client";
import React, { ReactElement, useEffect } from "react";
import Link from "next/link";
import Head from "next/head"
import { useAppSelector } from "@redux-state/app/hooks";
import { useAppDispatch } from "@redux-state/app/hooks";
import {
  setCardState,
  switchLeft,
  switchRight,
  switchDiplay,
} from "@redux-state/Cards/cardSlice";
import { asyncDeleteSet } from "@redux-state/createTerm/createterm";
import BigButton from "@components/BigButton";
import router from "next/router";

interface Props {
  studyset: any;
}

const Card = ({ name, definition, studySetId }: Term) => {
  const dispatch = useAppDispatch();
  return (
    <div
      onClick={() => dispatch(switchDiplay())}
      className=" flex justify-center items-center rounded-xl shadow-xl cursor-pointer text-5xl text-white w-4/6  h-96 bg-card m-5 transition duration-75 ease-in-out transform active:opacity-50 "
    >
      {studySetId == 0 ? name : definition}
    </div>
  );
};

//studyset:data
export default function ({ studyset: data }: Props): ReactElement {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCardState({ Terms: data.terms }));
  }, []);
  const { Terms, activeLeft, activeRight, activeTerm, display } =
    useAppSelector((state) => state.card);

  return (
    <main className="flex flex-col items-center justify-start h-screen bg-primary-dark w-full flex-1 px-5 lg:px-20 text-center">
      <Head>
        <title>{data.name+" Set"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className=" flex text-white justify-between text-3xl mt-5 p-5 font-bold border-b-2 w-full">
        <div>
        <p>{data.name}</p>
        <p className="text-xl font-normal">{data.description}</p>
        </div>
        <div className=" flex gap-4">
        <Link href={`${data.id}/edit`}>
        <BigButton
              label="edit terms"
              onClick={() =>{}}
            />
        </Link>
        <Link href={`${data.id}/create`}>
        <BigButton
              label="create terms"
              onClick={() =>{}}
            />
        </Link>
        <BigButton
              label="Delete"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => dispatch(asyncDeleteSet(data.id)).then((res)=>router.replace("/account"))}
            />
        </div>
      </h1>
      {data.terms.length > 0 ? (
        <>
          <Card
            name={data.terms[activeTerm].name}
            definition={data.terms[activeTerm].definition}
            id={data.terms[activeTerm].id}
            studySetId={display ? 1 : 0}
          />

          <div className="flex w-full text-xl gap-4 text-white justify-center items-center h-10">
            <button
              onClick={() => dispatch(switchLeft())}
              disabled={!activeLeft}
            >
              {"<="}
            </button>
            <p className="">
              {activeTerm + 1}/{Terms.length}
            </p>
            <button
              onClick={() => dispatch(switchRight())}
              disabled={!activeRight}
            >
              {"=>"}
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-4xl mt-5 text-white">you have no terms...</h1>
      )}
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const studyset = await prisma.studySet.findUnique({
    where: { id: Number(id) },
    include: { terms: true },
  });
  //studyset
  return { props: { studyset } };
}
