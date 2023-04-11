import React from "react"
import PropTypes from "prop-types";

export const Checkbox = ({
    labelText, 
    checked = false, 
    onChange, 
    id
}) => {
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

Checkbox.propTypes = {
    labelText: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};