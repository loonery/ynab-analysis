import React from "react"
import Form from "react-bootstrap/Form"

export const Checkbox = ({labelText, checked, onChange}) => {
    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                id={labelText + ' checkbox'} 
                onChange={onChange}
                checked={checked}
            />
            <label 
                className={"form-check-label"} 
                htmlFor={labelText + ' checkbox'} 
            >
                {labelText}
            </label>
        </div>
    )
}
