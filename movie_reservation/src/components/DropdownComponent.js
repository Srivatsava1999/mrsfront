import React from "react";
import "./DropdownComponent.css";


const DropdownComponent=({options,labelKey,valueKey, onChange})=>{
    console.log(options);
    return (
        <select onChange={(e)=>onChange(e.target.value)}>
            <option value="">All</option>
            {options.map((option)=>(
                <option value={option[valueKey]}>{option[labelKey]}</option>
            ))}
        </select>

    );
}

export default DropdownComponent;