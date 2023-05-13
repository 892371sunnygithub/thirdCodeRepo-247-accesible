import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MainLogo, UploadIcon, CategoryIcon, OrderIcon, UsersIcon, UserIcon, BillingIcon, SpaceUsageIcon, LogoutIcon, CloseMenu, Mobilemenu } from 'assets/images'
import { orderInProcess } from 'redux/reducer/AdminAsyncApi/asyncApi'
import { ROUTES } from 'routes/constant'
import './sidebar.scss'
import { Col, Row } from 'react-bootstrap'

const Sidebar = ({ isToggle, setIsToggle }) => {
  const orderCount = useSelector(state => state.adminSlice.order_In_Process?.data)
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [route, setRoute] = useState('');
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!isToggle) {
      buttonRef.current.focus()
    }
  }, [isToggle]);

  useEffect(() => {
    dispatch(orderInProcess({ user_id: 1 }))
  }, [])


  const checkKey = (e) => {
    const currentNode = e.target;
    const lastChild = divRef.current;
    if (currentNode === lastChild && window.innerWidth <= 767) {
      e.preventDefault();
      buttonRef.current.focus();
    }
  }

  const sidebarStatus = (status) => {
    setIsToggle(false);
    setRoute(status);
  }

  return (
    <header className={`sideBar ${isToggle ? `toggle` : ``}`} onKeyDown={checkKey} >
       <div className='mobileHeader'>
        <Row className='align-items-center'>
          <Col  md={12}>
            <Link to="/" className='sideBar-Logo'>
              <img src={MainLogo} alt='247 Accessible Documents Logo' className='img-fluid logo-desktop' />
            </Link> 
          </Col>
          <Col md={12} className='mobile-show'>
            <button aria-haspopup="menu" aria-label="open navigation" ref={buttonRef} className={`mobileToggle d-none ${isToggle ? 'menuClose' : 'menuOpen'}`} onClick={() => { setIsToggle(!isToggle) }} >
                <Mobilemenu className='menu-bar' role="img" />
                <CloseMenu className='menu-close' aria-hidden="true" focusable="false" />
            </button>
          </Col>
        </Row>
      </div>
      <div className='sidebarScroll mt-2' >
        <nav aria-label="Main">
          <ul className='sideBar__list sideBar__listTop ' >
            <li className={route === 'dashboard' && 'active'}>
              <Link onClick={() => sidebarStatus('dashboard')} replace>
                <span className='sidebar__icon'><CategoryIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Dashboard</span>
              </Link>
            </li>
            <li className={route === 'upload' && 'active'}>
              <Link to={ROUTES.UPDATE} onClick={() => sidebarStatus('upload')} replace>
                <span className='sidebar__icon'><UploadIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Upload</span>
              </Link>
            </li>
            <li className={route === 'order' && 'active'}>
              <Link to={ROUTES.ORDER_MANAGEMENT} onClick={() => sidebarStatus('order')} replace>
                <span className='sidebar__icon'><OrderIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Order</span>
                <span className='badge ms-auto'>{orderCount}</span>
              </Link>
            </li>
            <li className={route === 'user' && 'active'}>
              <Link to={ROUTES.MANAGE_USERS} aria-current="page" onClick={() => sidebarStatus('user')} replace>
                <span className='sidebar__icon'><UsersIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Manage Users</span>
              </Link>
            </li>
            <li className={route === 'billing' && 'active'}>
              <Link onClick={() => sidebarStatus('billing')} replace>
                <span className='sidebar__icon'><BillingIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Billings</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className='spaceCardWrapper' >
          <div className='spaceCard d-flex justify-content-around align-items-center'>
            <div className='spaceCard__left'>
              <SpaceUsageIcon aria-hidden="true" focusable="false" />
            </div>
            <div className='spaceCard__Right'>
              <span>Space Usage</span>
              <p className='mb-0'>200 MB</p>
            </div>
          </div>
        </div>
        <nav aria-label="UserAccount">
          <ul className='sideBar__list sideBar__listBottom mt-5'>
            <li className={route === 'profile' && 'active'}>
              <Link to="" onClick={() => sidebarStatus('profile')} replace>
                <span className='sidebar__icon'><UserIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text'>Profile</span>
              </Link>
            </li>
            <li className={route === 'logout' && 'active'}>
              <Link to="" ref={divRef} onClick={() => sidebarStatus('logout')} replace>
                <span className='sidebar__icon'><LogoutIcon aria-hidden="true" focusable="false" /></span>
                <span className='sidebar__text' >Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Sidebar