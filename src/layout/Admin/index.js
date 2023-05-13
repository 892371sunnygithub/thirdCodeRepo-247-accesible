import React, { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from 'components/header'
import Sidebar from 'components/sidebar'

const AdminRoute = ({ children, title }) => {
    const [isToggle, setIsToggle] = useState(true)
    const skipRef = useRef()
    const mainRef = useRef()
    const skipContent = () => {
        mainRef.current.classList.add('skip_content')
        skipRef.current.focus()
    }

    return (
        <Fragment>
            <Link className='focus_on_hover' ref={mainRef} onClick={skipContent} onKeyPress={(e) => {
                if (e.key === "Enter") {
                    mainRef.current.classList.add('skip_content')
                    skipRef.current.focus()
                }
            }}>Skip to main content</Link>
            <div className='dashboardWrapper' >
                <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
                <main className='mainContentWrapper' >
                    <Header title={title} ref={skipRef} setIsToggle={setIsToggle} isToggle={isToggle} />
                    <div className='mainContent'>
                        <div className='mainContentInner'>
                            {children}
                        </div>
                    </div>
                </main>
                {isToggle && <div className='sidebar-ovrly'></div>}

            </div>
        </Fragment>
    )
}

export default AdminRoute