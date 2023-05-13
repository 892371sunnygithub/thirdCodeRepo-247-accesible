import React from 'react'
import { Bars } from 'react-loader-spinner'
import './loader.scss'
export const Loader = () => {
    return (
        <div className='loader-global'>
            <Bars
                height="80"
                width="80"
                color="#0074B2"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
