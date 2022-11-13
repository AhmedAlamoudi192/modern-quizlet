import React, { ReactElement } from 'react'
import Image from 'next/image'

interface Props {
    url:string;
    heading:string;
    paragraph:string;
    reverse?:boolean;
}

const SpecialMsg = ():ReactElement =>{
    return(
        <div className='font-bold text-3xl py-40'>
            <p>90% of students who use Quizlet report higher grades.</p>
        </div>
    )
}

const InforComponent = ({url,heading,paragraph,reverse}:Props):ReactElement => {
    return(
        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-4 grid-cols-1 px-10 '>
            <div className='flex flex-col justify-center items-center gap-10' ><h1 className='font-bold text-3xl'>{heading}</h1><p className='text-lg w-3/4' >{paragraph}</p></div>
            <div className={reverse?`lg:order-first`:``} ><Image src={url} height={400} width={500} ></Image></div>
        </div>
    )
}

export default function SiteBody(): ReactElement {
    return (
        <div>
            <SpecialMsg/>
            <InforComponent url="/firstIcon.webp" heading='Explanations you can trust' paragraph='Quizlet explanations show you step-by-step approaches to solve tough problems. Find solutions in 64 subjects, all written and verified by experts.' />
            <InforComponent reverse url="/secondIcon.webp" heading='Flashcards on repeat. Study modes on shuffle.' paragraph='Mixed with smart study tools, our flashcards have been helping students ace their toughest exams since 2005' />
            <InforComponent url="/thirdImage.webp" heading='Whether you plan or cram, find your study jam.' paragraph='Early morning? All-nighter? With teaching methods backed by learning science, Quizlet is designed to save you time.' />
            <InforComponent reverse url="/forthIcon.webp" heading='Millions of study sets' paragraph='Find, study or create sets anywhere life takes you with the mobile app.' />
        </div>
    )
}
