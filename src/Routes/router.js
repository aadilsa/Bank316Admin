import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from '../Auth/Login';
import User from '../Pages/User/User';
import Menu from '../Pages/Menu/Menu';
import Role from '../Pages/Role/Role';
import UserDetail from '../Pages/User/UserDetail';
import Country from '../Pages/Country/Country';
import Dashboard from '../Pages/Dashboard/Dashboard';
import ChangePassword from '../Pages/ChangePassword/ChangePassword';
import BankList from '../Pages/BankList/BankList';
import Employees from '../Pages/Employees/Employees';
import LavelInvest from '../Pages/LavelInvestment/LavelInvest';
import CustomTransaction from '../Pages/User/CustomTransaction';
import Form from '../Pages/Form/Form';
import Transaction from '../Pages/User/CurrencyTransaction';
import VerifyError from '../Pages/VerifyPage/VerifyError';
import Verifysuccess from '../Pages/VerifyPage/Verifysuccess';
import Profile from '../Pages/Profile/Profile';
import ForgetPassword from '../Auth/ForgetPassword';
import Currency from '../Pages/Currency/Currency';
import Setting from '../Pages/setting/Setting';
import WalletIcon from '../Pages/WalletIcon/WalletIcon';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import SingleCurrencyTran from '../Pages/User/SingleCurrencyTran';
import Employe from '../Pages/Employees/Employe';
import AllCurrency from '../Pages/AllTransaction/AllCurrency';
import ReqMoneyTxn from '../Pages/RequestMoney/ReqMoneyTxn';
import { AllCustom } from '../Pages/AllTransaction/AllCustom';
import { AddEmploye } from '../Pages/Role/AddEmploye';
import ManageRoles from '../Pages/Role/ManageRoles';
import { ManageEmploye } from '../Pages/Role/ManageEmploye';
import PaymentCharge from '../Pages/PaymentCharge/PaymentCharge';
import RequestMoney from '../Pages/RequestMoney/RequestMoney';
import AddRole from '../Pages/Role/AddRole';
import EditRole from '../Pages/Role/EditRole';
import EditEmployee from '../Pages/Role/EditEmployee';
import { SingleCustomTran } from '../Pages/User/SingleCustomTran';
import { Insiderecipients } from '../Pages/Recipients/Insiderecipients';
import { OutsideRecipient } from "../Pages/Recipients/OutsideRecipient"
import { AllOutsideRecipiens } from '../Pages/Allrecipients/AllOutsideRecipiens'
import { AllInsideRecipients } from '../Pages/Allrecipients/AllInsideRecipients';
import { Outsidetxns } from '../Pages/Allrecipients/Outsidetxns';
import FundingAccounts from '../Pages/FundingAccounts/FundingAccounts';
import Outsidetxn from '../Pages/Allrecipients/Outsidetxn';
import AccountManagers from '../Pages/AccountManagers/AccountManagers';
import Conversions from '../Pages/Conversions/Conversions';
import FAQ from '../Pages/FAQ/FAQ';
import CreateFAQ from "../Pages/FAQ/CreateFAQ";
import UpdateFAQ from '../Pages/FAQ/UpdateFAQ';
import Referrals from '../Pages/Referrals/Referrals';
import Transfers from '../Pages/Transfers/Transfers';
import PaymentLinkThird from '../Pages/pageForAPK/PaymentLinkThird';
import PaymentLinkFirst from '../Pages/pageForAPK/PaymentLinkFirst';
import PaymentLinkSeco from '../Pages/pageForAPK/PaymentLinkSeco';
import BalanceDashboard from '../Pages/Dashboard/Balance_Dashboard';
import UsersDashboard from '../Pages/Dashboard/UsersDashboard';
import Withdrawals from '../Pages/Withdrawals/Withdrawals';
import UserMangement from '../Pages/UserManagement/UserMangement';
import VerificationCentre from '../Pages/UserManagement/VerificationCentre';
import ActiveUser from '../Pages/UserManagement/ActiveUser';
import InactiveUser from '../Pages/UserManagement/InactiveUser';
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={<PrivateRoute><User /></PrivateRoute>} />
                <Route path="/Permission" element={<PrivateRoute><Menu /></PrivateRoute>} />
                <Route path="/role" element={<PrivateRoute><Role /></PrivateRoute>} />
                <Route path="/user-details" element={<PrivateRoute><UserDetail /></PrivateRoute>} />
                <Route path="/country" element={<PrivateRoute><Country /></PrivateRoute>} />
                <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/admin/balance-dashboard" element={<PrivateRoute><BalanceDashboard /></PrivateRoute>} />
                <Route path="/admin/users-dashboard" element={<PrivateRoute><UsersDashboard /></PrivateRoute>} />
                <Route path="/admin/deposits" element={<PrivateRoute><RequestMoney /></PrivateRoute>} />
                <Route path="/admin/deposits/transactions" element={<PrivateRoute><ReqMoneyTxn /></PrivateRoute>} />
                <Route path="/admin/withdrawals" element={<PrivateRoute><Withdrawals /></PrivateRoute>} />
                <Route path="/admin/Referrals" element={<PrivateRoute><Referrals /></PrivateRoute>} />
                <Route path="/admin/conversions" element={<PrivateRoute><Conversions /></PrivateRoute>} />
                <Route path="/admin/transfers" element={<PrivateRoute><Transfers /></PrivateRoute>} />
                <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
                <Route path="/bank-list" element={<PrivateRoute><BankList /></PrivateRoute>} />
                <Route path="/currency-transaction" element={<PrivateRoute><Transaction /></PrivateRoute>} />
                <Route path="/employees" element={<PrivateRoute><Employees /></PrivateRoute>} />
                <Route path="/lavel-investment" element={<PrivateRoute><LavelInvest /></PrivateRoute>} />
                <Route path="/custom-transaction" element={<PrivateRoute><CustomTransaction /></PrivateRoute>} />
                <Route path="/form" element={<PrivateRoute><Form /></PrivateRoute>} />
                <Route path="/verify-Error" element={<PrivateRoute><VerifyError /></PrivateRoute>} />
                <Route path="/verify-success" element={<PrivateRoute><Verifysuccess /></PrivateRoute>} />
                <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/admin/currencies" element={<PrivateRoute><Currency /></PrivateRoute>} />
                <Route path="/setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
                <Route path="/wallet-icon" element={<PrivateRoute><WalletIcon /></PrivateRoute>} />
                <Route path="/transaction" element={<PrivateRoute><SingleCurrencyTran /></PrivateRoute>} />
                <Route path="/employe" element={<PrivateRoute><Employe /></PrivateRoute>} />
                <Route path="/manage-employee" element={<PrivateRoute><ManageEmploye /></PrivateRoute>} />
                <Route path="/manage-roles" element={<PrivateRoute><ManageRoles /></PrivateRoute>} />
                <Route path="/add-role" element={<PrivateRoute><AddRole /></PrivateRoute>} />
                <Route path="/add-employee" element={<PrivateRoute><AddEmploye /></PrivateRoute>} />
                <Route path="/admin/funding-accounts" element={<PrivateRoute><FundingAccounts /></PrivateRoute>} />
                <Route path="/admin/allCustom-transaction" element={<PrivateRoute><AllCustom /></PrivateRoute>} />
                <Route path="/admin/allCurrency-transaction" element={<PrivateRoute><AllCurrency /></PrivateRoute>} />
                <Route path="/admin/charges" element={<PrivateRoute><PaymentCharge /></PrivateRoute>} />
                <Route path="/edit-role" element={<PrivateRoute><EditRole /></PrivateRoute>} />
                <Route path="/edit-employee" element={<PrivateRoute><EditEmployee /></PrivateRoute>} />
                <Route path="/single-custom-transaction" element={<PrivateRoute><SingleCustomTran /></PrivateRoute>} />
                <Route path="/customer/inside-recipients" element={<PrivateRoute><Insiderecipients /></PrivateRoute>} />
                <Route path="/customer/outside-recipients" element={<PrivateRoute><OutsideRecipient /></PrivateRoute>} />
                <Route path="/outside-recipients" element={<PrivateRoute><AllOutsideRecipiens /></PrivateRoute>} />
                <Route path="/inside-recipients" element={<PrivateRoute><AllInsideRecipients /></PrivateRoute>} />
                <Route path="/outside-transactions" element={<PrivateRoute><Outsidetxns /></PrivateRoute>} />
                <Route path="/outside-transaction" element={<PrivateRoute><Outsidetxn /></PrivateRoute>} />
                <Route path="/account-managers" element={<PrivateRoute><AccountManagers /></PrivateRoute>} />

                <Route path="/admin/user-mangement" element={<PrivateRoute><UserMangement /></PrivateRoute>} />
                <Route path="/admin/active-users" element={<PrivateRoute><ActiveUser /></PrivateRoute>} />
                <Route path="/admin/inactive-users" element={<PrivateRoute><InactiveUser /></PrivateRoute>} />

                <Route path="/admin/verification-Centre" element={<PrivateRoute><VerificationCentre /></PrivateRoute>} />
                <Route path="/admin/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
                <Route path="/create-faq" element={<PrivateRoute><CreateFAQ /></PrivateRoute>} />
                <Route path="/edit-faq" element={<PrivateRoute><UpdateFAQ /></PrivateRoute>} />
                <Route path="/payment-link/request" element={<PaymentLinkFirst />} />
                <Route path="/payment-link/options" element={<PaymentLinkSeco />} />
                <Route path="/payment-link/ok" element={<PaymentLinkThird />} />
                <Route path="*" element={<PrivateRoute><PageNotFound /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;


const PrivateRoute = ({ children }) => {
    const auther = localStorage.getItem("logintoken") !== null && localStorage.getItem("logintoken") !== undefined && localStorage.getItem("logintoken") !== "" ? true : false
    return auther === true ? (
        children
    ) : (
        <Navigate to="/" replace />
    );
}