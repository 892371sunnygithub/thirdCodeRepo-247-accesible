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
import Input from "components/inputField";

import "./OrderInformationFileTable.scss";
import { Col, Row } from "react-bootstrap";

const OrderInformationFileTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order_listing, loading } =
    useSelector((state) => state.adminSlice) || {};
  const { success } = order_listing || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

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
            {cell === "NULL" ? row.job_order_no : cell}
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

          <span className="role">654</span>
        </div>
      );
    }
    if (column === "status") {
      return (
        <div>
          {/* <span className={`_badge ${JOB_STATUS_CLASS[cell]}`}>{JOB_STATUS[cell]}</span> */}
          <span className="role"> $689.89</span>
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
      width: "20%",
    },
    {
      key: "job_file_upload_date",
      title: "Type",
      sorting: true,
      searching: false,
      width: "20%",
    },
    {
      key: "job_no_of_page",
      title: "Date of Delivery",
      sorting: true,
      searching: false,
      width: "20%",
    },

    {
      key: "job_deliver_date",
      title: "Number Of Pages",
      sorting: true,
      searching: false,
      width: "20%",
    },
    {
      key: "status",
      title: "Total Cost",
      sorting: true,
      searching: false,
      width: "8%",
    },
  ];

  return (
    <>
      <div className="dt-responsive">
        {!loading && success && (
          <>
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
            <div className="couponcode-block">
              <Row>
                <Col md={"12"} lg="7" xl={"8"}>
                  <div className="couponCode">
                    <div className="coupon-input">
                      <Input
                        type="text"
                        label="Add Discount Coupon Code (optional)"
                        required={false}
                        ErrorLabel={""}
                        name=""
                        value={""}
                      />

                      <Button
                        title={"Apply Coupon"}
                        className={"button--blue apply-btn"}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={"12"} lg="5" xl={"4"}>
                  <div className="total-discount-table">
                    <table className="discountTable">
                      <tr>
                        <th>
                          <strong>Total</strong>
                        </th>
                        <td>
                          <strong>$3883.76</strong>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <strong>Total Discount</strong>
                        </th>
                        <td>
                          <strong>$3883.76</strong>
                        </td>
                      </tr>
                      <tr>
                        <th>
                          <strong>Balance Payable</strong>
                        </th>
                        <td>
                          <strong>$3883.76</strong>
                        </td>
                      </tr>
                    </table>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
        {!loading && !success && (
          <div className="no-record-main">
            <div className="no-record">{order_listing?.message}</div>
          </div>
        )}
        {loading && <Loader />}
      </div>
    </>
  );
};
export default OrderInformationFileTable;
