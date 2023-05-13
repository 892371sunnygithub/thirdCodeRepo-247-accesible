import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "components/loader";
import DataTablesComp from "components/dataTable";
import { orderListing } from "redux/reducer/AdminAsyncApi/asyncApi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/constant";
import moment from "moment";
import { Trash3 } from "assets/images";
import { JOB_STATUS, JOB_STATUS_CLASS } from "constants/job_status";

import Button from "components/Button";
import Modal from "react-bootstrap/Modal";
import Input from "components/inputField";

const ConfirmFileTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_listing, loading } =
    useSelector((state) => state.adminSlice) || {};
  const { success } = order_listing || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal Constants
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(orderListing({ user_id: 1 }));
  }, []);

  const cellRendrer = useCallback((cell, row, column, index) => {
    if (column === "job_invoice_no") {
      return (
        <div
          id={row.id}
          onClick={() =>
            navigate(ROUTES.ORDER_DETAILS + "/" + row.job_id, {
              state: { id: cell === "NULL" ? row.job_order_no : cell, row },
            })
          }
        >
          <a href="javascript:void()" className="download-link">
            {cell === "NULL" ? row.job_order_no : cell}{" "}
          </a>
        </div>
      );
    }

    if (column === "job_file_upload_date") {
      return (
        <div id={row.id}>
          <span className="role">{moment(cell).format("MMM DD, YYYY")}</span>
        </div>
      );
    }
    if (column === "job_no_of_page") {
      return (
        <div>
          {/* {cell} */}
          <span className="role">{moment(cell).format("MMM DD, YYYY")}</span>
        </div>
      );
    }
    if (column === "job_deliver_date") {
      return (
        <div id={row.id}>
          {/* <span className="role">{moment(cell).format('MMM DD, YYYY')}</span> */}

          <span className="role">
            <select className="form-control">
              <option>PDF</option>
              <option>PPT</option>
              <option>Word</option>
            </select>
          </span>
        </div>
      );
    }
    if (column === "status") {
      return (
        <div>
          {/* <span className={`_badge ${JOB_STATUS_CLASS[cell]}`}>{JOB_STATUS[cell]}</span> */}
          <button className="trashicon" onClick={handleShow}>
            <Trash3 />
          </button>
        </div>
      );
    }

    return row[column];
  }, []);

  const tableHead = [
    {
      key: "job_invoice_no",
      title: "FILE NAME",
      sorting: true,
      searching: true,
      width: "40%"
    },
    {
      key: "job_file_upload_date",
      title: "PAGES",
      sorting: true,
      searching: false,
      width: "20%"
    },
    {
      key: "job_no_of_page",
      title: "Est. Date of Delivery",
      sorting: true,
      searching: false,
      width: "20%"
    },
    {
      key: "job_deliver_date",
      title: "FILE TYPES",
      sorting: true,
      searching: false,
      width: "12%"
    },
    {
      key: "status",
      title: "ACTIONS",
      sorting: true,
      searching: false,
      width: "8%",
    },
  ];

  return (
    <>
      <div className="dt-responsive border-table">
        {!loading && success && (
          <DataTablesComp
            tableHead={tableHead}
            data={order_listing.jobs}
            renderCell={cellRendrer}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setPageSize={setPageSize}
            pageSize={pageSize}
            type="order"
            search={false}
            pageSizing={false}
            paginationBar={false}
            // pageSize={true}
          />
        )}
        {!loading && !success && (
          <div className="no-record-main">
            <div className="no-record">{order_listing?.message}</div>
          </div>
        )}
        {loading && <Loader />}
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop={true}
        className="trash-Modal"
      >
        <Modal.Header closeButton>
          <h2 className="d-flex align-items-center">
            {" "}
            <button className="trashicon me-3">
              <Trash3 />
            </button>{" "}
            Delete File{" "}
          </h2>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            label="You are about to delete a file.Are you sure that you want to delete this file?"
            required={false}
            ErrorLabel={""}
            name=""
            value={""}
            placeholder={"To confirm this, type 'YES'"}
          />

<div className="modalButtons w-100 d-flex justify-content-between">
            <Button
              title={"No"}
              className={"button--white"}
              onClick={handleClose}
            />
            <Button
              title={"Yes"}
              className={"button--danger ms-3"}
              onClick={handleClose}
            />
          </div>
        </Modal.Body>
        
      </Modal>
    </>
  );
};
export default ConfirmFileTable;
