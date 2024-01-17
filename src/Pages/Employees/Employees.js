import React, { useEffect, useState } from 'react';
import Container from '../../component/container';
import { GetEmployeesdata } from '../../API/Employees/Employees';
import ReactPaginate from 'react-paginate';
import Loader from '../Loader/Loader';
import { Image } from 'antd';
import { useNavigate } from 'react-router-dom';

const Employees = () => {
    const [dataEmployees, setdataEmployees] = useState([])
    const [activeSearch, setactiveSearch] = useState(false);
    const [search, setsearch] = useState("")
    const [id, setid] = useState()
    const [pageNumber, setPagenumber] = useState(1)
    const [entries, SetEntries] = useState('10')
    const [totalSize, setTotalSize] = useState(10)
    const [count, setcount] = useState()
    const [example, setExample] = useState(false)
    const [sortedBy, setSortedBy] = useState("id")
    const [orderBy, setOrderBy] = useState('desc')
    const [scroll, setscroll] = useState(false)
    const token = localStorage.getItem("logintoken")
    const navigate = useNavigate()

    setTimeout(() => {
        setscroll(true)
    }, 3000);


    const handleSideClick = () => {
        setactiveSearch(!activeSearch);
    };

    const [selectedRoleId, setSelectedRoleId] = useState(null);
    const handleCheckboxChange = (roleId) => {
        if (selectedRoleId === roleId) {
            setSelectedRoleId(null);
        } else {
            setSelectedRoleId(roleId);
        }
    };


    const EmployeesData = async () => {
        try {
            const totaldata = await GetEmployeesdata(token, search, pageNumber, sortedBy, orderBy)
            console.log(totaldata, "totaldata")
            if (totaldata.status == true) {
                setExample(true)
                setdataEmployees(totaldata.data.rows)

                const Count = totaldata.data.count
                setcount(Count)
                setTotalSize(Count / entries)
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        EmployeesData()
    }, [search, pageNumber, sortedBy, orderBy])


    const Click = async (d) => {
        window.scrollTo(0, 0);
        var CurrentPage = d.selected + 1;
        setPagenumber(CurrentPage)
    };


    const sortChange = (col) => {
        if (col === sortedBy) {
            setSortedBy(col);
            orderBy === "asc" ? setOrderBy("desc") : setOrderBy("asc")
        } else {
            setSortedBy(col)
            setOrderBy("desc")
        }
    }

    const singleEmploye = (id) => {
        // navigate("/employe", { state: id })
        console.log(id, "idddddd")
    }


    return (
        <Container>
            <div className="nk-content ">
                <div className="container-fluid">
                    <div className="nk-content-inner">
                        <div className="nk-content-body">
                            <div className="nk-block-head nk-block-head-sm">
                                <div className="nk-block-between">
                                    <div className="nk-block-head-content">
                                        <h3 className="nk-block-title page-title">Employees</h3>
                                        <div className="nk-block-des text-soft">
                                            <p>You have total {count} Employees.</p>
                                        </div>
                                    </div>
                                    <div className="nk-block-head-content">
                                        <div className="toggle-wrap nk-block-tools-toggle">
                                            <a className="btn btn-icon btn-trigger toggle-expand me-n1" data-target="pageMenu"><em className="icon ni ni-menu-alt-r" /></a>
                                            <div className="toggle-expand-content" data-content="pageMenu">
                                                <ul className="nk-block-tools g-3">

                                                    <li>
                                                        <div className="form-control-wrap">
                                                            <div className="form-icon form-icon-right">
                                                                <em className="icon ni ni-search" />
                                                            </div>
                                                            <input type="text" className="form-control" id="default-04" placeholder="Search by name" onChange={(e) => { setsearch(e.target.value); setPagenumber(1) }} />
                                                        </div>
                                                    </li>

                                                    <li><a className="btn btn-white btn-outline-primary"><em className="icon ni ni-download-cloud" /><span>Export</span></a></li>
                                                    <li className="nk-block-tools-opt">
                                                        <div className="drodown">
                                                            {/* <a className="dropdown-toggle btn btn-icon btn-primary" data-bs-toggle="dropdown" ><em className="icon ni ni-plus" /></a>
                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                <ul className="link-list-opt no-bdr">
                                                                    <li><a ><span>Add Employees</span></a></li>
                                                                    <li><a ><span>Add Team</span></a></li>
                                                                    <li><a ><span>Import Employees</span></a></li>
                                                                </ul>
                                                            </div> */}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="nk-block">
                                <div className="nk-tb-list is-separate mb-3">
                                    <div className="nk-tb-item nk-tb-head">
                                        <div className="nk-tb-col"><span className="sub-text">Employee {sortedBy == "firstname" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("firstname") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("firstname") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">Phone{sortedBy == "phone" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("phone") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("phone") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Date Of Birth {sortedBy == "dob" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("dob") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("dob") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-lg"><span className="sub-text">Country {sortedBy == "country_of_residence" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("country_of_residence") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("country_of_residence") }} />}</span></div>
                                        <div className="nk-tb-col tb-col-md"><span className="sub-text">House Number{sortedBy == "street_housenumber" && orderBy === "desc" ? <em className="icon ni ni-arrow-down" style={{ cursor: 'pointer' }} onClick={() => { sortChange("street_housenumber") }} /> : <em className="icon ni ni-arrow-up" style={{ cursor: 'pointer' }} onClick={() => { sortChange("street_housenumber") }} />}</span></div>
                                        <div className="nk-tb-col text-end"><span className="sub-text">Action</span></div>
                                    </div>{/* .nk-tb-item */}
                                    {
                                        dataEmployees.length == 0 &&
                                        <div className="nk-tb-item">
                                            {/* <div className="nk-tb-col nk-tb-col-check"></div> */}
                                            <div className="nk-tb-col"></div>
                                            <div className="nk-tb-col tb-col-md"></div>
                                            <div className="nk-tb-col tb-col-lg">
                                                {scroll == true ? <h6>No Employees Available</h6> : <Loader />}
                                            </div>
                                            <div className="nk-tb-col tb-col-md"></div>
                                            <div className="nk-tb-col nk-tb-col-tools"></div>
                                            <div className="nk-tb-col nk-tb-col-tools"></div>
                                        </div>

                                    }

                                    {
                                        dataEmployees.length > 0 && dataEmployees.map((data) => {

                                            return (

                                                <div className="nk-tb-item" key={data.id}>
                                                    {/* <div className="nk-tb-col nk-tb-col-check">
                                                                    <div className="custom-control custom-control-sm custom-checkbox notext">
                                                                        <input type="checkbox" className="custom-control-input"
                                                                            id={`uid_${data.id}`}
                                                                            checked={selectedRoleId === data.id}
                                                                            onChange={() => handleCheckboxChange(data.id)}
                                                                        />
                                                                        <label className="custom-control-label" htmlFor={`uid_${data.id}`} />
                                                                    </div>
                                                                </div> */}

                                                    <div className="nk-tb-col">
                                                        <a >
                                                            <div className="user-card">
                                                                <div className="user-avatar bg-primary">
                                                                    <span><Image src={data.avatar} alt='img' /></span>
                                                                </div>

                                                                {
                                                                    data.firstname == null ? <div className="user-info">
                                                                        <span className="tb-lead">{ }<span className="dot dot-success d-md-none ms-1" /></span>
                                                                        <span>{data.email}</span>
                                                                    </div> : <div className="user-info">
                                                                        <span className="tb-lead">{data.firstname} {data.lastname} <span className="dot dot-success d-md-none ms-1" /></span>
                                                                        <span>{data.email}</span>
                                                                    </div>
                                                                }

                                                            </div>
                                                        </a>
                                                    </div>

                                                    <div className="nk-tb-col tb-col-md">
                                                        <span>+{data.phone_code}{data.phone}</span>
                                                    </div>


                                                    {
                                                        data.dob == null ? <div className="nk-tb-col tb-col-lg">
                                                            <span>N/A</span>
                                                        </div> : <div className="nk-tb-col tb-col-lg">
                                                            <span>{data.dob}</span>
                                                        </div>
                                                    }

                                                    {
                                                        data.country_of_residence == null ? <div className="nk-tb-col tb-col-lg">
                                                            <span>N/A</span>
                                                        </div> : <div className="nk-tb-col tb-col-lg">
                                                            <span>{data.country_of_residence}</span>
                                                        </div>
                                                    }

                                                    <div className="nk-tb-col tb-col-md">
                                                        <span className="tb-status">{data.street_housenumber}</span>
                                                    </div>
                                                    <div className="nk-tb-col nk-tb-col-tools">
                                                        <ul className="nk-tb-actions gx-1">

                                                            <li onClick={() => { setid(data.id) }}>
                                                                <div className="drodown">
                                                                    <a className="dropdown-toggle btn btn-icon btn-trigger" data-bs-toggle="dropdown"><em className="icon ni ni-more-h" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-end">
                                                                        <ul className="link-list-opt no-bdr">
                                                                            {/* <li><a ><em className="icon ni ni-focus" /><span>Quick View</span></a></li> */}
                                                                            {/* <li

                                                                            ><a ><em className="icon ni ni-eye" /><span style={{ cursor: "pointer" }} onClick={() => { singleEmploye(data.id) }}>View Details</span></a></li>
                                                                            <li><a ><em className="icon ni ni-repeat" /><span>Transaction</span></a></li> */}
                                                                            {/* <li><a ><em className="icon ni ni-activity-round" /><span>Activities</span></a></li> */}
                                                                            {/* <li className="divider" />
                                                                                        <li><a ><em className="icon ni ni-shield-star" /><span>Reset Pass</span></a></li>
                                                                                        <li><a ><em className="icon ni ni-shield-off" /><span>Reset 2FA</span></a></li>
                                                                                        <li><a ><em className="icon ni ni-na" /><span>Suspend User</span></a></li> */}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                            )

                                        })
                                    }



                                </div>{/* .nk-tb-list */}
                                <div className="card">
                                    <div className="card-inner">
                                        <div className="nk-block-between-md g-3">
                                            <div className="g">
                                                {example == true &&
                                                    <ReactPaginate

                                                        previousLabel={"Previous"}
                                                        nextLabel={'Next'}
                                                        forcePage={pageNumber - 1}
                                                        breakLabel={"..."}
                                                        pageCount={totalSize}
                                                        marginPagesDisplayed={1}
                                                        pageRangeDisplayed={2}
                                                        onPageChange={Click}
                                                        containerClassName={'pagination justify-content-center'}
                                                        pageClassName={'page-item'}
                                                        pageLinkClassName={'page-link'}
                                                        previousClassName={'page-item'}
                                                        previousLinkClassName={'page-link'}
                                                        nextClassName={'page-item'}
                                                        nextLinkClassName={'page-link'}
                                                        breakClassName={"page-item"}
                                                        breakLinkClassName={'page-link'}
                                                        activeClassName={'active'}

                                                    />
                                                }
                                            </div>



                                            <div className="g">
                                                <div className="pagination-goto d-flex justify-content-center justify-content-md-start gx-3">
                                                    <div>Page</div>
                                                    <div>
                                                        <select className="form-select js-select2" data-search="on" data-dropdown="xs center">
                                                            <option value="page-1">1</option>
                                                            <option value="page-2">2</option>
                                                            <option value="page-4">4</option>
                                                            <option value="page-5">5</option>
                                                            <option value="page-6">6</option>
                                                            <option value="page-7">7</option>
                                                            <option value="page-8">8</option>
                                                            <option value="page-9">9</option>
                                                            <option value="page-10">10</option>
                                                            <option value="page-11">11</option>
                                                            <option value="page-12">12</option>
                                                            <option value="page-13">13</option>
                                                            <option value="page-14">14</option>
                                                            <option value="page-15">15</option>
                                                            <option value="page-16">16</option>
                                                            <option value="page-17">17</option>
                                                            <option value="page-18">18</option>
                                                            <option value="page-19">19</option>
                                                            <option value="page-20">20</option>
                                                        </select>
                                                    </div>
                                                    <div>OF 102</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>{/* .card */}
                            </div>{/* .nk-block */}
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    );
}

export default Employees;
