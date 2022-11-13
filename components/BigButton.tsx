import React, { MouseEventHandler, ReactElement } from 'react'

interface Props {
    onClick:MouseEventHandler<HTMLButtonElement>;
    label:string
    className?:string
}

export default function BigButton({onClick,label,className}: Props): ReactElement {
    return (
        <button onClick={onClick} className={` ${className} text-lg h-16 w-36 text-white font-bold px-2 rounded bg-footer hover:bg-primary transition-colors  `}>
        {label}
      </button>
    )
}
