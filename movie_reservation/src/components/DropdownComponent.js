import React from "react";
import "./DropdownComponents.css";


const DropdownComponent=({options,labelKey,valueKey, onChange})=>{
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