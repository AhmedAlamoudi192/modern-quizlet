import prisma from "@helperInstances/prisma";
import { supabase } from "@helperInstances/supabaseClient";
import React, { ReactElement, useEffect } from "react";
import Link from "next/link";
import Head from "next/head"


interface Props {
  data: Array<any>;
}

const StudyCard = ({ name, slugId }): ReactElement => {
  
  return (
    <Link href={`study-set/${slugId}`}>
      <div className="m-5 h-36 flex items-center justify-center text-white font-bold text-lg cursor-pointer rounded-xl transition-all duration-500 bg-gradient-to-tl from-blue-800 via-blue-600 to-blue-400 bg-size-200 bg-pos-0 hover:bg-pos-100 ">
        {name}
      </div>
    </Link>
  );
};

export default function account({data}: Props): ReactElement {
  
  return (
    <main className="flex flex-col items-center justify-start h-screen bg-primary-dark w-full flex-1 px-5 lg:px-20 text-center">
      <Head>
        <title>Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className=" flex justify-between text-white text-3xl mt-5 p-5 font-bold border-b-2 w-full">
        <div className="hidden lg:block lg:px-16" />
        <p>Study Sets</p>
        <Link href={"study-set"} ><button className="text-lg text-white font-bold px-2 rounded bg-footer hover:bg-primary transition-colors  ">create set</button></Link>
      </h1>      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full ">
        {data.map((item, index) => (
          <StudyCard key={index} name={item.name} slugId={item.id} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: "/login", permanent: false } };
  }
  const data = await prisma.studySet.findMany({
    where: { userId: String(user.id) },
    
  });

  // If there is a user, return it.
  return { props: { data } };
}
