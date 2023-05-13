import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import Card from 'components/Card';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_DETAIL } from 'constants/title';
import { DollarRounded, DateFile, Discount, InvoiceIcon, StatusIcon } from 'assets/images'
import { getOrderByID, orderDetails } from 'redux/reducer/AdminAsyncApi/asyncApi';
import { JOB_STATUS, JOB_STATUS_CLASS } from 'constants/job_status';
import { useLocation, useParams } from 'react-router-dom';
import { Loader } from 'components/loader';
import OrderDetailsTable from './OrderDetailsTable';
import './orderDetails.scss'


const OrderDetails = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const { order_details } = useSelector(state => state.adminSlice) || {}
    const { success } = order_details || {}
    const getOrderDetails = useSelector(state => state.adminSlice?.getOrderDetails?.job)
    const { loading } = useSelector(state => state.adminSlice)
    const { job_invoice_no, job_order_no, job_file_upload_date, status, job_total_cost, job_discounted_price, } = getOrderDetails || {}
    let balance = (parseFloat(job_total_cost).toFixed(2) - parseFloat(job_discounted_price).toFixed(2));

    const cardData = [
        { icon: <InvoiceIcon aria-hidden="true" focusable="false" />, title: 'invoice', count: `#${job_invoice_no === "NULL" ? job_order_no : job_invoice_no}` },
        { icon: <DateFile aria-hidden="true" focusable="false" />, title: 'Date', count: moment(job_file_upload_date).format('MMM DD, YYYY') },
        { icon: <StatusIcon aria-hidden="true" focusable="false" />, title: 'Status', count: <span className={`_badge ${JOB_STATUS_CLASS[status]}`}>{JOB_STATUS[status]}</span> },
        { icon: <DollarRounded aria-hidden="true" focusable="false" />, title: 'Total', count: '$' + parseFloat(job_total_cost).toFixed(2) },
        { icon: <Discount aria-hidden="true" focusable="false" />, title: 'Total Discount', count: '$' + parseFloat(job_discounted_price).toFixed(2) },
        { icon: <DollarRounded aria-hidden="true" focusable="false" />, title: 'Balance Payable', count: '$' + parseFloat(balance).toFixed(2) }
    ]

    document.title = ORDER_DETAIL(job_invoice_no === "NULL" ? job_order_no : job_invoice_no)

    const paymentcardData = [
        { icon: <DateFile aria-hidden="true" focusable="false" />, title: 'Date of Payment', count: 'Feb 10, 2018' },
        { icon: <InvoiceIcon aria-hidden="true" focusable="false" />, title: 'Payment by', count: 'Available Credit' },
    ]
    useEffect(() => {
        dispatch(getOrderByID({ job_id: params?.id }))
        dispatch(orderDetails({ job_invoice_no: location?.state?.id }))
    }, [])

    return (
        <>
            <div>
                {!loading && <dl className='topCards'>
                    <Row className='align-items-center mainRow'>
                        {cardData.map((data, index) =>
                            <Col key={"card" + index} xs={12} sm={6} lg={6} xl={4} className="mb-3">
                                <Card icon={data.icon} title={data.title} count={data.count} />
                            </Col>
                        )}
                    </Row>
                </dl>}
                <div className="mainWrapper UM-Wrapper order-detail">
                    <div className='mainTitleWrapper '>
                        {!loading &&
                            <Row className='align-items-center'>
                                <Col sm={12} md={12}>
                                    <h2 className='mainTitle mb-0' id="table_desc" >Order Information</h2>
                                </Col>
                            </Row>}
                    </div>
                    <OrderDetailsTable location={location} params={params} order_details={order_details} success={success} loading={loading} />
                </div>

                {!loading &&
                    <div className='customBlock mt-5'>
                        <h2 className='mainTitle mb-4'>Payment</h2>
                        <dl>
                            <Row className='align-items-center paymentCard'>
                                {paymentcardData.map((data, index) =>
                                    <Col xs={12} sm={12} lg={6} className="mb-3">
                                        <Card icon={data.icon} title={data.title} count={data.count} />
                                    </Col>
                                )}
                            </Row>
                        </dl>
                    </div>}
            </div>
            {loading && <Loader />}
        </>
    )
}

export default OrderDetails