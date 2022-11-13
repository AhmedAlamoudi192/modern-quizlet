import React, { ReactElement } from 'react'
import Image from 'next/image'

interface Props {
    
}
const desktopClassesh1 = "pl-8 md:text-5xl text-left md:w-2/6 text-black md:text-white font-bold md:absolute bottom-1"
const desktopClassesp = "pl-8 md:text-left md:text-base md:w-2/6 text-black md:text-white md:absolute -bottom-20 "

export default function HeroImg({}: Props): ReactElement {
    return (
        <div className=' py-8'>
            <Image className='block w-full object-cover min-h-screen relative rounded-3xl' src="/HeroImg.webp" height={600} width={1200} />
            <h1 className={`text-xl ${desktopClassesh1}`}>Learn it. Own it. Quizlet.</h1>
            <p className={` text-lg ${desktopClassesp}`}>With new expert explanations, an AI Learning Assistant and our ever-effective flashcards, get a suite of science-backed study tools at your fingertips.</p>
        </div>
    )
}
