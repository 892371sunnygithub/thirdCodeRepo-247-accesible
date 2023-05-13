import React from 'react'
import './input.scss'
const Input = React.forwardRef((props, ref) => {
    const { type, value, label, forLabel, name, error, errorMsg, onInputChange, placeholder, accept, role, autocomplete, required, ErrorLabel, onFocus } = props || {}
    return (
        <div className={`inputRow ${error && `error-row`}`} >
            <label htmlFor={forLabel} className='mb-2' role={role}>{label}{required && <sup className='text-danger'>*</sup>} </label>
            <input aria-describedby={ErrorLabel} id={forLabel} autocomplete={autocomplete} ref={ref} type={type} value={value} onFocus={(e) => onFocus(e)} onChange={(e) => onInputChange(e, name)} accept={accept} placeholder={placeholder} className='form-control' name={name} />
            {error && <span className='error-msg' id={ErrorLabel} >{errorMsg}</span>}
        </div>
    )
})

export default Input