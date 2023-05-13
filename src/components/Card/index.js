import React from 'react'
import './cardProps.scss'
const Card = ({icon , title ,count}) => {
    return (
        <div className='card-props d-flex align-items-center'>
                <span className='cardIcon'>{icon}</span>
                <div className='cardTitle ps-3'>
                    <dt>{title}</dt>
                    <dd>{count}</dd>
                </div>
         </div>
    )
}   

export default Card