import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/loader";
import DataTablesComp from "components/dataTable";
import { orderListing } from "redux/reducer/AdminAsyncApi/asyncApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/constant";
import moment from "moment";
import { JOB_STATUS, JOB_STATUS_CLASS } from "constants/job_status";
const OrderTable = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { order_listing, loading } = useSelector(state => state.adminSlice) || {}
  const { success } = order_listing || {}
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  useEffect(() => {
    dispatch(orderListing({ user_id: 1 }))
  }, [])


  const cellRendrer = useCallback((cell, row, column, index) => {
    if (column === 'job_invoice_no') {
      return (
        <div id={row.id} onClick={() => navigate(ROUTES.ORDER_DETAILS + '/' + row.job_id, { state: { id: cell === "NULL" ? row.job_order_no : cell, row } })}>
          <a href="javascript:void()" className="download-link">{cell === "NULL" ? row.job_order_no : cell} </a>
        </div>
      )
    }

    if (column === 'job_file_upload_date') {
      return (
        <div id={row.id} >
          <span className="role">{moment(cell).format('MMM DD, YYYY')}</span>
        </div>
      )
    }
    if (column === 'job_no_of_page') {
      return (
        <div >
          {cell}
        </div>
      )
    }
    if (column === 'job_deliver_date') {
      return (
        <div id={row.id} >
          <span className="role">{moment(cell).format('MMM DD, YYYY')}</span>
        </div>
      )
    }
    if (column === 'status') {
      return (
        <div >
          <span className={`_badge ${JOB_STATUS_CLASS[cell]}`}>{JOB_STATUS[cell]}</span>
        </div>
      )
    }

    return row[column]
  }, []);

  const tableHead = [
    { key: 'job_invoice_no', title: "INVOICE NUMBER", sorting: true, searching:true  },
    { key: 'job_file_upload_date', title: "DATE", sorting: true, searching:false  },
    { key: 'job_no_of_page', title: "TOTAL PAGES", sorting: true, searching:false },
    { key: 'job_deliver_date', title: "DATE OF DELIVERY", sorting: true, searching:false },
    { key: 'status', title: "STATUS", sorting: true, searching:false },
  ]

  return (
    <div className="dt-responsive">
      {!loading && success &&
        <DataTablesComp
          tableHead={tableHead}
          data={order_listing.jobs}
          renderCell={cellRendrer}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setPageSize={setPageSize}
          pageSize={pageSize}
          type="order"
          search={true}
          pageSizing ={true}
          paginationBar={true}
        // pageSize={true} 
        />}
      {!loading && !success && <div className="no-record-main"><div className="no-record">{order_listing?.message}</div></div>}
      {loading && <Loader />}
    </div>
  );
}
export default OrderTable;