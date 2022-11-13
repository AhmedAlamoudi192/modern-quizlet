import React, { FormEvent, ReactElement } from "react";


const InputField = ({ label, type, placeholder }): ReactElement => {
    return (
      <>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="{label}"
        >
          {label}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id={label}
          placeholder={placeholder}
          type={type}
        />
      </>
    );
  };

  export default InputField