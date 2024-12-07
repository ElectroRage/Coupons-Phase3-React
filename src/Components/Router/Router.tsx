import "./Router.css";
import {Route, Routes, useLocation} from "react-router-dom";
import {LoginBox} from "../LoginPage/LoginBox/LoginBox";
import {AdminPage} from "../AdminComponents/AdminPage/AdminPage";
import {CompanyPanel} from "../CompanyComponents/CompanyPanel/CompanyPanel";
import React, {useEffect} from "react";
import authService from "../../Services/AuthService";


export function Router(): JSX.Element {

    const location = useLocation();

    // useEffect(() => {
    //     config.header
    //
    // )
    //
    // }, []);
    return (
        <div className="Routing">
            <Routes>
                <Route path="login" element={<LoginBox/>}/>
                <Route path="adminpanel" element={<AdminPage/>}/>
                <Route path="companypanel" element={<CompanyPanel/>}/>
            </Routes>

        </div>
    );
}