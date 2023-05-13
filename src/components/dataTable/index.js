import React, { useEffect, useState, useRef } from 'react';
import { AddUserIcon, ArrowDown, ArrowUp, Clear, Search } from 'assets/images';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import 'bootstrap/dist/js/bootstrap.bundle'
import _ from 'lodash';
import './table.scss';
import { SORT } from './constant';
const Datatable = (props) => {
    const { currentPage, setCurrentPage, setPageSize, pageSize, type, search, pageSizing , paginationBar} = props
    const pageContentSize = [5, 10, 15, 20]
    const tableRef = useRef(null)
    const searchRef = useRef(null)
    const entriesRef = useRef(null)
    const { data, tableHead, renderCell } = props
    const [temp, setTemp] = useState(data)
    const [start, setStart] = useState((currentPage - 1) * pageSize)
    const [last, setlast] = useState(currentPage * pageSize)
    const navigate = useNavigate();
    const [FilterData, setFilterData] = useState([]);
    const [searchApiData, setSearchApiData] = useState([]);
    const [Order, setOrder] = useState('ASC');
    const [FilterVal, setFilterVal] = useState('');
    const [sortCol, setSortCol] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setFilterData(data);
        setSearchApiData(data);
        setTemp(data)
        entriesRef.current.role = "status"
        entriesRef.current.ariaLive = "polite"
    }, [data, pageSize])

    useEffect(() => {
        setStart((currentPage - 1) * pageSize)
        setlast(currentPage * pageSize)
        setSortCol('')
    }, [currentPage])


    const sortings = (col) => {
        if (Order === "ASC") {

            if (col === "is_admin") {

                const sorted = [...temp].sort((a, b) => a[col] > b[col] ? 1 : -1);
                setTemp(sorted);

            } else {

                const sorted = [...temp].sort((a, b) => a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
                setTemp(sorted);
            }
            // const sorted = [...temp].sort((a, b) =>  a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            // setTemp(sorted);
            setOrder("DSC");
        }

        if (Order === "DSC") {
            // const sorted = [...temp].sort( (a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1  );

            if (col === "is_admin") {
                const sorted = [...temp].sort((a, b) => a[col] < b[col] ? 1 : -1);
                setTemp(sorted);
            } else {
                const sorted = [...temp].sort((a, b) => a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
                setTemp(sorted);

            }
            // setTemp(sorted);
            setOrder("ASC");
        }
        setSortCol(col)
    }

    const searchOnEnter = (e) => {
        if (e.key === 'Enter') {
            handleFilter('search')
        }
    }

    const handleFilter = (searchVal) => {
        setLoading(true)
        if (searchVal == 'clear') {
            setTemp(searchApiData);
            setFilterVal('')
            setLoading(false)
        } else {
            const filterResult = searchApiData.filter((item, i) => {
                for (var c = 0; c < tableHead.length; c++) {
                    var filedname = '';
                    if (tableHead[c].searching === true) {
                        var filedname = item[tableHead[c].key];
                        if (filedname === 'NULL') {
                            filedname = item.job_order_no;


                            return filedname.toLowerCase().includes(FilterVal.toLowerCase())
                        }
                        else {
                            return filedname.toLowerCase().includes(FilterVal.toLowerCase())
                        }
                    }
                }
            });



            if (filterResult.length > 0) {
                setTemp(filterResult);
                setLoading(false)

            } else {
                setTemp([]);
                setLoading(false)
            }
        }
        // tableRef.current.focus()
    }

    const pageCount = temp ? Math.ceil(temp.length / pageSize) : 0;
    const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);
    const pages = range(1, pageCount + 1);

    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        setStart((pageSize * (pageNo - 1)))
        setlast(pageSize * pageNo)
    }

    const nextButton = () => {
        if (pages.length >= currentPage + 1) {
            setStart((pageSize * currentPage))
            setlast(pageSize * (currentPage + 1))
            setCurrentPage(currentPage + 1);
        }
    }

    const preButton = () => {
        if (currentPage > 1) {
            console.log(currentPage, pageSize)
            setStart((currentPage - 2) * pageSize)
            setlast(pageSize * (currentPage - 1))
            setCurrentPage(currentPage - 1);
        }
    }

    const SelectedList = (e) => {
        const { value } = e.target
        const intVal = parseInt(value)
        setStart((intVal * (currentPage - 1)))
        setlast((currentPage * intVal))
        setPageSize(intVal)
        setCurrentPage(1)
    }

    return (
        <>
            {!loading &&
                <div className='table_container dataTables_wrapper'>
                    <div className="table_header_data d-flex justify-content-end align-items-center">
                        {search &&
                            <div className="d-flex align-items-center dataTables_filter">
                                <label htmlFor="search-field" className='' >Search:</label>
                                <input ref={searchRef} type='input' id="search-field" value={FilterVal} onChange={(e) => setFilterVal(e.target.value)} onKeyDown={(e) => searchOnEnter(e)} aria-controls="table1" className='table_search ms-1' />
                                {FilterVal.length > 0 &&
                                    <button className='clear' onClick={() => { handleFilter('clear'); searchRef.current.focus() }} aria-label="clear"><Clear /></button>
                                }
                                <button onClick={() => handleFilter('search')} className="searchbtn" aria-label="search"><Search /></button>
                            </div>}
                        {type === 'user' &&
                            <div className="btn_group ms-4 me-2">
                                <Button
                                    icon={<AddUserIcon />}
                                    title={"Add User"}
                                    className={"button--blue ms-auto"}
                                    onClick={() => navigate("/addNewUser")}
                                    autoFocus={true}
                                />
                            </div>}
                    </div>

                    <div className="table_style">
                        <div className="table_data pt-3">
                            <div className='my-custom-div'>
                                <table className="table customTable" ref={tableRef} id="table1" aria-describedby="table1_info table_desc">
                                    <thead >
                                        <tr>
                                            {tableHead.map(({ title, key, sorting, width }) =>
                                                <th width={width} aria-controls="table1" aria-sort={SORT[Order]} onClick={() => sorting && sortings(key)} className={key === sortCol ? `sorting ${Order}` : ''} >
                                                    {sorting ?
                                                        <button className={` sorting_button d-flex align-items-center ${key} `} >
                                                            <span>{title} </span>
                                                            {sorting &&
                                                                <span className='sort-btn d-flex flex-column ms-2'>
                                                                    {key !== sortCol ?
                                                                        <>
                                                                            <ArrowUp aria-hidden="true" focusable="false" /> <ArrowDown aria-hidden="true" focusable="false" />
                                                                        </> :
                                                                        <>
                                                                            {key === sortCol && Order === 'ASC' && <ArrowUp aria-hidden="true" focusable="false" />}
                                                                            {key === sortCol && Order === 'DSC' && <ArrowDown aria-hidden="true" focusable="false" />}
                                                                        </>
                                                                    }
                                                                </span>}

                                                        </button> :
                                                        <div className={` d-flex align-items-center ${key} `} >
                                                            <span>{title} </span>
                                                        </div>

                                                    }
                                                </th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            temp &&
                                            temp.slice(start, last)?.map((curElm, index) => {
                                                {
                                                    return (
                                                        <tr key={`user_id` + index}>
                                                            {tableHead.map((data) =>
                                                                type === "order" || type === "order-details" ?
                                                                    data.key === "job_invoice_no" || data.key === "job_document_name" ?
                                                                        <th id={Math.floor(100000 + Math.random() * 900000)}>
                                                                            <div>
                                                                                {renderCell ? renderCell(curElm[data.key], curElm, data.key, index) : <span>{curElm[data.key]} </span>}
                                                                            </div>
                                                                        </th> :
                                                                        <td id={Math.floor(100000 + Math.random() * 900000)}>
                                                                            <div>
                                                                                {renderCell ? renderCell(curElm[data.key], curElm, data.key, index) : <span>{curElm[data.key]} </span>}
                                                                            </div>
                                                                        </td>
                                                                    :
                                                                    <td >
                                                                        <div>
                                                                            {renderCell ? renderCell(curElm[data.key], curElm, data.key, index) : <span>{curElm[data.key]} </span>}
                                                                        </div>
                                                                    </td>
                                                            )}
                                                        </tr>
                                                    )
                                                }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>



                            <div className='pagination-inner-wrapper'>
                                {pageSizing && <div className='d-flex align-items-center dt-length'>
                                    <label for="show_entries" className='me-2'>Show entries</label>
                                    <select id="show_entries" aria-describedby='table1_info' className="form-select w-auto" value={pageSize} onChange={SelectedList} >
                                        {
                                            pageContentSize.map((curElm, index) => {
                                                return (
                                                    <>
                                                        <option value={curElm} key={index} > {curElm} </option>
                                                    </>
                                                )
                                            })
                                        }
                                    </select>
                                </div>}


                                <div className={paginationBar ? "dataTables_info" : "total_page_count"} id="table1_info" aria-describedby='table_desc' ref={entriesRef} >
                                    Showing {
                                        ((pageSize * (currentPage - 1) + 1))} to {pages.length === currentPage ? temp?.length : (pageSize * currentPage)} of <span>{temp?.length}</span> entries
                                </div>

{paginationBar &&  
                                <nav aria-label="Pagination" className='dataTables_paginate'>
                                    <ul className="pagination mb-0 d-flex align-items-center cursor">
                                        <li>
                                            <button onClick={() => preButton()} className={`paginate_button  ${currentPage === 1 ? `disabled` : `enabled`}`} disabled={currentPage === 1 && true}>
                                                <BsChevronLeft className='' />
                                                <span className={`me-2`}   > Previous</span>
                                            </button>
                                        </li>
                                        {
                                            pages.map((page) => (
                                                <li className={page == currentPage ? "me-2 dt-item active " : "dt-item me-2"} ><button role="link" className="dt-link cursor_pointer" onClick={() => pagination(page)} aria-label={`page ${page}`}>{page} </button></li>
                                            ))
                                        }
                                        <li>
                                            <button onClick={() => nextButton()} className={`paginate_button ${((currentPage === pageSize - 1) || pages.length === 1) ? `disabled` : `enabled`}`} disabled={((currentPage === pageSize - 1) || pages.length === 1) && true}>
                                                <span className='' >Next</span>
                                                <BsChevronRight />
                                            </button>
                                        </li>
                                    </ul>
                                </nav>}


                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default Datatable