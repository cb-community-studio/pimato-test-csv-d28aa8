import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';

import UsersPage from "../components/UsersPage/UsersPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
import EmployeePage from "../components/EmployeePage/EmployeePage";
import SingleEmployeePage from "../components/EmployeePage/SingleEmployeePage";
import StoresPage from "../components/StoresPage/StoresPage";
import SingleStoresPage from "../components/StoresPage/SingleStoresPage";
import SalesPage from "../components/SalesPage/SalesPage";
import SingleSalesPage from "../components/SalesPage/SingleSalesPage";
import InvetoryPage from "../components/InvetoryPage/InvetoryPage";
import SingleInvetoryPage from "../components/InvetoryPage/SingleInvetoryPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />
            {/* protected route https://www.robinwieruch.de/react-router-private-routes/ */}

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
                    <Route path="/users" exact element={<UsersPage />} />
                    <Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
                    <Route path="/employee" exact element={<EmployeePage />} />
                    <Route path="/employee/:singleEmployeeId" exact element={<SingleEmployeePage />} />
                    <Route path="/stores" exact element={<StoresPage />} />
                    <Route path="/stores/:singleStoresId" exact element={<SingleStoresPage />} />
                    <Route path="/sales" exact element={<SalesPage />} />
                    <Route path="/sales/:singleSalesId" exact element={<SingleSalesPage />} />
                    <Route path="/invetory" exact element={<InvetoryPage />} />
                    <Route path="/invetory/:singleInvetoryId" exact element={<SingleInvetoryPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
