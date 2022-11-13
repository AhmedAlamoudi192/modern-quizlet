import React from "react"

const UnderLinedIF = ({label,onChange,value}) => {
    return(<div className="flex flex-col items-start">
        <input id={label} onChange={onChange} value={value}
            className="m-2 block w-full px-0.5 border-0 border-b-2 bg-transparent border-gray-200 focus:border-yellow-300 focus-visible:outline-none"
        />
        <label
          className="block ml-2 text-white text-sm font-bold mb-2"
          htmlFor="{label}"
        >{label}</label>
        </div>
    )
}

export default UnderLinedIF