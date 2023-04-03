import React from "react"
export const Checkbox = ({labelText, checked, onChange, id}) => {
    return (
        <div className="form-check">
            <input 
                className="form-check-input" 
                type="checkbox" 
                id={id} 
                onChange={onChange}
                checked={checked}
            />
            <label 
                className={"form-check-label"} 
                htmlFor={id} 
            >
                {labelText}
            </label>
        </div>
    )
}
