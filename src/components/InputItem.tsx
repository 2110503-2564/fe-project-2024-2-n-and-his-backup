import React from "react";
import { useState } from "react";

export default function InputItem({
    id,
    type,
    isRequired,
    tag,
    width,
    onValueChange
    }:{
    id:string,
    type:string,
    isRequired:boolean,
    tag:React.ReactElement,
    width:number,
    onValueChange:Function
    }) {
    const [value, setValue] = useState('');

    return (
        <div className={`flex flex-row px-4 py-3 bg-gray-800 text-white rounded-lg w-[${width}%] gap-3`}>
            {React.cloneElement(tag, { style: { fontSize: '1.6rem' } as React.CSSProperties } as React.HTMLAttributes<HTMLElement>)}

            <input
            type={type}
            id={id}
            value={value}
            onChange={(e) => {setValue(e.target.value); onValueChange(e.target.value)}}
            placeholder={`Enter your ${id}`}
            required={isRequired}
            className="w-full bg-transparent outline-none focus:ring-0"
            />
        </div>
    );
}