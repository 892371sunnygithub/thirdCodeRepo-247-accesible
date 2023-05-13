import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import DataTablesComp from "components/dataTable";
import { ArrowDownLong } from 'assets/images'
import { downloadAllPdf, downloadAllReport, downloadReport, download_pdf, tableDes } from "redux/reducer/AdminAsyncApi/asyncApi";
import Button from "components/Button";
import { JOB_STATUS, JOB_STATUS_CLASS } from "constants/job_status";
import { getItem, setItem } from "constants/localstorage";

const OrderDetailsTable = ({ location, order_details, success, loading }) => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const cellRendrer = useCallback((cell, row, column, index) => {
        if (column === 'job_document_name') {
            return (
                <div >
                    <a id={row.job_id} href="javascript:void()" className="download-link file_name_id">{cell} </a>
                </div>
            )
        }

        if (column === 'job_document_type') {
            return (
                <div id={cell+index}>
                    {cell}
                </div>
            )
        }
        if (column === 'job_deliver_date') {
            return (
                <div>
                    <span className="role">{moment(cell).format('MMM DD, YYYY')}</span>
                </div>
            )
        }
        if (column === 'job_filestatus') {
            return (
                <div >
                    <span className={`_badge ${JOB_STATUS_CLASS[cell]}`}>{JOB_STATUS[cell]}</span>
                </div>
            )
        }
        if (column === 'job_price_per_page') {
            return (
                <div >
                    <span>${parseFloat(cell).toFixed(2)}</span>
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
        if (column === 'job_file_size') {
            return (
                <div>
                    {parseInt(cell / 1024)} MB
                </div>
            )
        }
        if (column === 'job_total_cost') {
            return (
                <div >
                    <span>${parseFloat(cell).toFixed(2)}</span>
                </div>
            )
        }
        if (column === 'job_id') {
            return (
                <>
                    {row.accessible_filename && <div className="download-flie-btns" >
                        <button role={"link"} autoFocus={getItem('id') === row.job_id ? true : false} id={index+'1'} className={`download-link job_button`} onClick={() => {setItem( 'id',row.job_id); dispatch(download_pdf({ job_id: cell, filename: row.accessible_filename })) }} download  aria-labelledby={row.job_id+ " " +row.job_document_type+index+ " " +index+1} >
                            <ArrowDownLong aria-hidden="true" focusable="false" />Accessible File
                        </button>
                        <button role={"link"} autoFocus={getItem('id') === row.job_filename ? true : false} id={index+'2'} className={`download-link job_button`} onClick={() => {setItem('id',row.job_filename);dispatch(downloadReport({ job_id: cell, filename: row.job_pac3_filename })) }} download aria-labelledby={row.job_id+ " " +row.job_document_type+index+ " " +index+2}>
                            <ArrowDownLong aria-hidden="true" focusable="false" /> Report
                        </button>
                    </div>
                    }
                </>
            )
        }

        return row[column]
    }, []);

    const tableHead = [
        { title: "Name", key: 'job_document_name', sorting: true },
        { title: "Type", key: 'job_document_type', sorting: true },
        { title: "Date of delivery", key: 'job_deliver_date', sorting: true },
        { title: "status", key: 'job_filestatus', sorting: true },
        { title: "price per page (usage)", key: 'job_price_per_page', sorting: true },
        { title: "no of pages(s)", key: 'job_no_of_page', sorting: true },
        { title: "file size", key: 'job_file_size', sorting: false },
        { title: "total", key: 'job_total_cost', sorting: false },
        { title: "Download", key: 'job_id', sorting: false }
    ]

    useEffect(() => {
        return () => {
            // dispatch(tableDes())
        }
    }, [])

    return (
        <div className="dt-responsive">
            {success &&
                <div>
                    {!loading && success &&
                        <DataTablesComp
                            tableHead={tableHead}
                            data={order_details.jobs}
                            renderCell={cellRendrer}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            setPageSize={setPageSize}
                            pageSize={pageSize}
                            type="order-details"
                            search={false}
                            pageSizing ={false}
                            paginationBar={true}
                        />}
                    <div className='form-buttons d-flex align-items-center justify-content-end px-4 py-5'  >
                        <Button disabled={!order_details.download_status} title={"Download All Accessible Files"} onClick={() => dispatch(downloadAllPdf({ job_invoice_no: location?.state?.id }))} className={"button--border"} />
                        <Button disabled={!order_details.download_status} title={"Download All Reports"} onClick={() => dispatch(downloadAllReport({ job_invoice_no: location?.state?.id }))} className={"button--blue ms-3"} />
                    </div>
                </div>
            }
            {!loading && !success && order_details?.message && <div className="no-record-main"><div className="no-record">{order_details?.message}</div></div>}
        </div>
    );
}
export default OrderDetailsTable;