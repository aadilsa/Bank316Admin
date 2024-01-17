import React from 'react'
import Container from '../../component/container'

function Setting() {
    return (
        <Container>

        </Container>
    )
}

export default Setting

// import { useFormik } from 'formik'
// import React, { useEffect, useState } from 'react'
// import * as yup from 'yup';
// import { toast } from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { EditUserrole } from '../../service/lenderService';
// import { Breadcrumbsecond } from '../../../components';

// const Editroles = () => {
//     const prefix = process.env.REACT_APP_LENDER_PRIFIX;
//     const navigate = useNavigate()
//     const lender = JSON.parse(localStorage.getItem("lender"))
//     const token = lender.lender_token
//     const ids = useLocation();
//     const [employeeData, setEmployeeData] = useState([]);
//     const [titles, setTitle] = useState()
//     // const permissions = JSON.parse(ids.state.permissions);
//     console.log(ids)
//     const title = ids?.state?.title
//     const role_id = ids?.state?.id
//     const role = ids?.state?.permissions;

//     if (role) {
//         var permissions = JSON.parse(role);

//     } else {

//     }
//     if (permissions.constructor.name == "Object") {
//         let emptarray = []
//         for (let i in permissions) {
//             emptarray.push(permissions[i])
//         }
//         permissions = emptarray
//     }
//     console.log(permissions)


//     const updateEmployeeData = (e, key) => {
//         const checkboxValue = e.target.value;
//         const isChecked = e.target.checked;

//         if (isChecked) {
//             setEmployeeData((prevData) => [...prevData, { value: checkboxValue, key }]);
//         } else {
//             setEmployeeData((prevData) => prevData.filter((item) => { return (item.key != key) }));
//         }
//     };



//     const [roles, setroles] = useState({})
//     useEffect(() => {
//         permissions.length > 0 && permissions?.map((options) => {
//             console.log(options, "options")
//             if (options.key == "new_employee_view") {
//                 roles.new_employee_view = true;
//             }
//             if (options.key == "new_employee_limit") {
//                 roles.new_employee_limit = true;
//             }
//             if (options.key == "existing_employee_view") {
//                 roles.existing_employee_view = true;
//             }
//             if (options.key == "existing_employee_limit") {
//                 roles.existing_employee_limit = true;
//             }
//             if (options.key == "employee_delete") {
//                 roles.employee_delete = true;
//             }
//             if (options.key == "merchant_pending_view") {
//                 roles.merchant_pending_view = true;
//             }
//             if (options.key == "merchant_pending_settlement_view") {
//                 roles.merchant_pending_settlement_view = true;
//             }

//             if (options.key == "merchant_add_settlement") {
//                 roles.merchant_add_settlement = true;
//             }
//             if (options.key == "merchant_paid_view") {
//                 roles.merchant_paid_view = true;
//             }
//             if (options.key == "merchant_update_paid_txn") {
//                 roles.merchant_update_paid_txn = true;
//             }
//             if (options.key == "merchant_paid_settlement") {
//                 roles.merchant_paid_settlement = true;
//             }
//             if (options.key == "thirdroc_pending_view") {
//                 roles.thirdroc_pending_view = true;
//             }

//             if (options.key == "thirdroc_add_settlement") {
//                 roles.thirdroc_add_settlement = true;
//             }
//             if (options.key == "thirdroc_paid_view") {
//                 roles.thirdroc_paid_view = true;
//             }
//             if (options.key == "thirdroc_update_paid_txn") {
//                 roles.thirdroc_update_paid_txn = true;
//             }
//             if (options.key == "thirdroc_paid_settlement") {
//                 roles.thirdroc_paid_settlement = true;
//             }
//             if (options.key == "repayment_view_pending") {
//                 roles.repayment_view_pending = true;
//             }
//             if (options.key == "repayment_view_paid") {
//                 roles.repayment_view_paid = true;
//             }
//             if (options.key == "roi_paid_view") {
//                 roles.roi_paid_view = true;
//             }
//         })
//         setroles(roles)
//     }, [permissions])



//     useEffect(() => {
//         let array = []
//         for (let i in roles) {
//             if (roles[`${i}`] == true) {
//                 array.push({
//                     value: true, key: i
//                 })
//             }
//         }
//         setEmployeeData([...array]);


//     }, [roles])

//     const form = useFormik({

//         initialValues: {
//             role_id: role_id,
//             title: title,
//             permission_key: ""
//         },
//         enableReinitialize: true,
//         validationSchema: yup.object({
//             title: yup.string().required('Please Enter Role Title'),

//         }),
//         onSubmit: async (values) => {

//             const data = JSON.stringify({
//                 role_id: role_id,
//                 title: values.title,
//                 permissions: employeeData
//             })
//             const response = await EditUserrole(token, data)
//             if (response.status == true) {
//                 toast.success(response.message)
//                 setTimeout(() => {
//                     navigate(prefix + '/manage_role')
//                 }, 1000)

//             } else if (response.status == false) {
//                 toast.error(response.message)
//             }
//         }
//     })

//     return (
//         <div className="main-container container-fluid px-0">
//             <div className="page-header">
//                 <div className="page-leftheader">
//                     <h4 className="page-title mb-0 text-primary">
//                         {/ <Breadcrumbs order={{ first: { name: "User Management" } }} / > /}
//                             < Breadcrumbsecond order={{ first: { name: "Manage Role", path: `${prefix}/manage_role` }, second: { name: "Edit Role" / , path: `${back}` / } }} />

//                     </h4>
//                 </div>
//             </div>
//             <form className="row" id='registerForm' onSubmit={form.handleSubmit}>
//                 <div className="row">
//                     <div className="col-xl-4 col-lg-6 col-md-6 col-xm-12">
//                         <div className="form-group">
//                             <label className="form-label">Title</label>
//                             <div className="row g-xs">
//                                 <div className="input-group">
//                                     <input type="text" className="form-control" placeholder="Enter Role Title" / defaultValue={titles} /
//                                     {...form.getFieldProps("title")}  / onClick={() => setTitle()} / />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <label>Borrower  </label>
//                         <div className="custom-controls-stacked d-flex mb-3">
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.new_employee_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "new_employee_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "new_employee_view")} />}
//                                 <span className="custom-control-label">View New Borrower</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.new_employee_limit ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "new_employee_limit")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "new_employee_limit")} />}
//                                 <span className="custom-control-label">Manage Limit</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.existing_employee_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "existing_employee_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "existing_employee_view")} />}
//                                 <span className="custom-control-label">View Existing Borrower</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.existing_employee_limit ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "existing_employee_limit")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "existing_employee_limit")} />}
//                                 <span className="custom-control-label">Manage Limit</span>
//                             </label>

//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <label>Pay To Merchant
//                         </label>
//                         <div className="custom-controls-stacked d-flex mb-3">
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_pending_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_pending_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_pending_view")} />}
//                                 <span className="custom-control-label">View Pending</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_pending_settlement_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_pending_settlement_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_pending_settlement_view")} />}
//                                 <span className="custom-control-label">View Pending Settlement</span>
//                             </label>

//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_add_settlement ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_add_settlement")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_add_settlement")} />}
//                                 <span className="custom-control-label">Add Settlement</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_paid_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_paid_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_paid_view")} />}
//                                 <span className="custom-control-label">View Paid</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_update_paid_txn ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_update_paid_txn")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_update_paid_txn")} />}
//                                 <span className="custom-control-label">Update Paid TXN</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.merchant_paid_settlement ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "merchant_paid_settlement")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "merchant_paid_settlement")} />}
//                                 <span className="custom-control-label">View Settlement</span>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <label>Pay To Thirdroc
//                         </label>
//                         <div className="custom-controls-stacked d-flex mb-3">
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.thirdroc_pending_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "thirdroc_pending_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "thirdroc_pending_view")} />}
//                                 <span className="custom-control-label">View Pending</span>
//                             </label>
//                             {/* <label className="custom-control custom-checkbox diclamerpage">
//                             { roles.thirdroc_pending_settlement_view ? <input type="checkbox" defaultChecked={true }
//                                 className="custom-control-input NewCHeckBx" value="true"
//                                 onClick={(e) => updateEmployeeData(e, "thirdroc_pending_settlement_view")} /> :
//                                 <input type="checkbox"  className="custom-control-input NewCHeckBx" value="true"
//                                 onClick={(e) => updateEmployeeData(e, "thirdroc_pending_settlement_view")} /> }
//                                 <span className="custom-control-label">View Pending Settlement</span>
//                             </label> */}

//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.thirdroc_add_settlement ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "thirdroc_add_settlement")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "thirdroc_add_settlement")} />}
//                                 <span className="custom-control-label">Add Settlement</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.thirdroc_paid_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "thirdroc_paid_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "thirdroc_paid_view")} />}
//                                 <span className="custom-control-label">View Paid</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.thirdroc_update_paid_txn ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "thirdroc_update_paid_txn")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "thirdroc_update_paid_txn")} />}
//                                 <span className="custom-control-label">Update Paid TXN</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.thirdroc_paid_settlement ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "thirdroc_paid_settlement")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "thirdroc_paid_settlement")} />}
//                                 <span className="custom-control-label">View Settlement</span>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <label>Repayment
//                         </label>
//                         <div className="custom-controls-stacked d-flex mb-3">
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.repayment_view_pending ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "repayment_view_pending")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "repayment_view_pending")} />}
//                                 <span className="custom-control-label">View Pending</span>
//                             </label>
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.repayment_view_paid ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "repayment_view_paid")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "repayment_view_paid")} />}
//                                 <span className="custom-control-label">View Paid</span>
//                             </label>
//                         </div>
//                     </div>
//                     <div className="row mb-3">
//                         <label>ROI(Return Of Investment)
//                         </label>
//                         <div className="custom-controls-stacked d-flex mb-3">
//                             <label className="custom-control custom-checkbox diclamerpage">
//                                 {roles.roi_paid_view ? <input type="checkbox" defaultChecked={true}
//                                     className="custom-control-input NewCHeckBx" value="true"
//                                     onClick={(e) => updateEmployeeData(e, "roi_paid_view")} /> :
//                                     <input type="checkbox" className="custom-control-input NewCHeckBx" value="true"
//                                         onClick={(e) => updateEmployeeData(e, "roi_paid_view")} />}
//                                 <span className="custom-control-label">View </span>
//                             </label>

//                         </div>
//                     </div>


//                     <div className="col-md-12">
//                         <button type="submit" className="btn btn-primary mb-6 w-md mt-1">Add</button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Editroles


