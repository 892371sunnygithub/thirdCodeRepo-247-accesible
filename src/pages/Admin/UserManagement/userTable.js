import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { EditIcon, VerticalDotsIcon } from 'assets/images'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Loader } from 'components/loader'
import { dummyImage } from 'assets/images'
import { fetchUserListing, makeInactiveUser, makeIsAdmin } from 'redux/reducer/AdminAsyncApi/asyncApi'
import { removeMessage } from 'redux/reducer/AdminAsyncApi/asyncApi'
import 'bootstrap/dist/js/bootstrap.bundle'
import _ from 'lodash';
import Datatable from 'components/dataTable'
import moment from 'moment'
import { getItem, setItem } from 'constants/localstorage'
import { Dropdown } from 'react-bootstrap'
import { toast } from 'react-toastify'
import './userManagement.scss'

const DummyTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user_listing, loading, addUpdateUser } = useSelector(state => state.adminSlice) || {}
  const { user, success } = user_listing;
  const { success: Success, message } = addUpdateUser || {}
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [initial, setInitial] = useState([]);


  console.log(user_listing.user)

  

  useEffect(() => {
    dispatch(fetchUserListing());
  
  }, []);

  const getInitials = (cell) => {
    var parts = cell.split(' ')
    var initials = '';

    for (var i = 0; i < parts.length; i++) {
      if (parts[i].length > 0 && parts[i] !== '') {
        initials += parts[i][0];

      }
    }
    let initialsUpperCase = initials.toLocaleUpperCase();

    return initialsUpperCase;

  }


  const userType = (type, user_id) => {
    if (type === "user") {
      setItem('id', user_id)
      dispatch(makeInactiveUser({ user_id }))
    } else {
      setItem('id', user_id)
      dispatch(makeIsAdmin({ user_id }))
    }
  }

  useEffect(() => {
    if (Success) {
      dispatch(fetchUserListing())
    }
  }, [Success])

  useEffect(() => {
    toast(message, { className: Success ? '_success' : '_error' })
    return () => {
      dispatch(removeMessage())
    }
  }, [message])

  const tableHead = [
    
    { key: 'user_firstname', title: "USER LIST", sorting: true, searching: true, width: '20%' },
    { key: 'user_email', title: "EMAIL", sorting: true, searching: true, width: '15%' },
    { key: 'user_status', title: "STATUS", sorting: true, searching: false, width: '15%' },
    { key: 'is_admin', title: "ROLE", sorting: true, searching: false, width: '15%' },
    { key: 'space_used', title: "SPACE USED", sorting: true, searching: false, width: '15%' },
    { key: 'loggedin_time', title: "LAST LOGGED IN", sorting: true, searching: false, width: '15%' },
    { key: 'user_id', title: "ACTION", sorting: false, searching: false, width: '15%' }
  ]

  const cellRendrer = useCallback((cell, row, column, index) => {
    if (column === 'user_firstname') {

     let a = user_listing.user;

     console.log(user_listing.user, '_userlist')


     console.log(a,'ssajklskls')
// const propertyValues = Object.values(user_listing.user);

// console.log(propertyValues , '---');



          return (
        <div className='user-group'>
          {true ? <span className='table_picture'>{cell.charAt(0).toLocaleUpperCase()}</span> : <img src={dummyImage} className='img-fluid table_picture ' alt={''} />}
          <span className='full-name ms-2'>{cell}</span>
        </div>
      )
    }

    if (column === 'user_email') {
      return (
        <div id={row.id} className="d-flex align-items-center" >
          <a href={`mailto:${cell}`} className="text_dec_none">{cell}</a>
        </div>
      )
    }
    if (column === 'user_status') {
      return (
        <div >
          <span className={`_badge ${cell === '1' ? 'active' : 'inactive'}`}>{cell === '1' ? 'Active' : 'Inactive'}</span>
        </div>
      )
    }
    if (column === 'is_admin') {
      return (
        <div id={row.id}>
          <span className="role">{cell ? 'Admin' : ''}</span>
        </div>
      )
    }
    if (column === 'loggedin_time') {
      return (
        <div id={row.id} >
          {moment(cell).format('DD MMM, YYYY')}
        </div>
      )
    }
    if (column === 'user_id') {
      return (
        <div className="table-button d-flex">
          <button className={`btn-table id${row.user_id}`} data-active={getItem('id') === row.user_id ? true : false} id={row.user_id} aria-label="Edit" type="button" onClick={() => navigate(`/updateUser/${cell}`, { state: { id: cell, mode: 'edit' } })}><EditIcon aria-hidden="true" and focusable="false" /> </button>
          <Dropdown className="btn-table ms-3 ">
            <Dropdown.Toggle variant="" autoFocus={getItem('id') === row.user_id ? true : false} aria-label="Status Options" className="border-btn btn-table" id="dropdown-basic">
              <VerticalDotsIcon aria-hidden="true" and focusable="false" />
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item aria-label={row.user_status === '1' ? 'Inactive User' : 'Active User'} id={cell} tp="user" onKeyPress={() => userType("user", cell)} onClick={() => userType("user", cell)}>{row.user_status === '1' ? 'Inactive User' : 'Active User'}</Dropdown.Item>
              <Dropdown.Item aria-label={row.is_admin ? 'Remove Admin' : 'Make Admin'} id={cell} tp="admin" onKeyPress={() => userType("user", cell)} onClick={() => userType("admin", cell)}>{row.is_admin ? 'Remove Admin' : 'Make Admin'}</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )
    }
    return row[column]
  }, []);

  return (
    <Fragment>
      {!loading && success &&
        <Datatable
          tableHead={tableHead}
          data={user}
          renderCell={cellRendrer}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          type="user"
          search={true}
          pageSizing={true}
          paginationBar={true}
        />
      }
      {!loading && !success && <div className="no-record-main"><div className="no-record">{user?.message}</div></div>}
      {loading && <Loader />}
    </Fragment>
  )
}

export default DummyTable

