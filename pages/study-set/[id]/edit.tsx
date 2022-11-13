import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import UnderLinedIF from "@components/UnderLinedInputField";
import BigButton from "@components/BigButton";
import { useAppDispatch, useAppSelector } from "@redux-state/app/hooks";
import {
  setTermState,
  controlDefinition,
  controlName,
  pushTerm,
  moveTerm,
  asyncUpdateTerm,
  asyncDeleteTerm,
  popTerm,
} from "@redux-state/createTerm/createterm";
import router from "next/router";
import prisma from "@helperInstances/prisma";
import { Term } from "@prisma/client";

interface Props {
  termsData: Term[];
}

export default function index({ termsData }: Props): ReactElement {
  
  useEffect(() => {
    dispatch(setTermState(termsData));
  }, []);

  const dispatch = useAppDispatch();
  const terms = useAppSelector((state) => state.createTerm);
  return (
    <main className="flex flex-col items-center justify-start h-full min-h-screen bg-primary-dark w-full flex-1 px-5 lg:px-20 text-center">
      <Head>
        <title>Edit Term</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-white text-3xl mt-5 p-5 font-bold">Edit Terms</h1>
        <BigButton
          label={"confirm edit"}
          onClick={() =>
            dispatch(asyncUpdateTerm()).then((res) => router.push('/account'))
          }
        />
      </div>
      <div className=" grid grid-cols-1 text-white border-t-2 justify-between items-center text-3xl mt-5 p-5 font-bold w-full">
        {terms.map((item, index) => (
          <div className="flex gap-6" key={index}>
            <UnderLinedIF
              label={"term"}
              onChange={(e) =>
                dispatch(controlName({ index: index, input: e.target.value }))
              }
              value={terms[index].name}
            />
            <UnderLinedIF
              label={"definition"}
              onChange={(e) =>
                dispatch(
                  controlDefinition({ index: index, input: e.target.value })
                )
              }
              value={terms[index].definition}
            />
            <BigButton
              label="Delete"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => dispatch(asyncDeleteTerm(item.id)).then((res)=>dispatch(popTerm({index:index})))}
            />
            <BigButton
              label="Up"
              onClick={() => dispatch(moveTerm({ index: index, up: true }))}
            />
            <BigButton
              label="Down"
              onClick={() => dispatch(moveTerm({ index: index, up: false }))}
            />
          </div>
        ))}
        <BigButton
          label={"create another term"}
          onClick={() => dispatch(pushTerm())}
        />
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const termsData = await prisma.term.findMany({
    where: { studySetId: Number(id) },
  });

  return { props: { termsData } };
}
