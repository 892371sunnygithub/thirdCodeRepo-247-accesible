import React from 'react'
import "./SelectBox.scss";

const SelectBox = ({ props , label}) => {
    console.log(props, '-props')
    return (

        <div className='inputRow ' >
            <label className='mb-2'>{label}</label>
            <select className='form-control'>
                <option>Select Option</option>
                {props.map((value) => {
                    return (
                        <option>{value}</option>
                    )
                })
                }
            </select>
        </div>

    )
}

export default SelectBox;