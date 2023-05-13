import React from 'react'
import { getItem } from 'constants/localstorage'
import "./button.scss"

const Button = (props) => {
    const { icon, title, className, onClick, type, tabIndex, disabled, autoFocus } = props

    return (
        <button autoFocus={getItem('add') === "add" && autoFocus} type={type} disabled={disabled}  className={`btn btn--md ${className}`} onClick={(e) => onClick(e)} tabIndex={tabIndex && tabIndex} > {icon}  {title}</button>
    )
}

export default Button;
