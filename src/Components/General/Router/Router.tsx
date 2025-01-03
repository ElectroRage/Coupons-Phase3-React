import "./Router.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {LoginBox} from "../LoginBox/LoginBox";
import {AdminPage} from "../../AdminComponents/AdminPage/AdminPage";
import {CompanyPanel} from "../../CompanyComponents/CompanyPanel/CompanyPanel";
import React, {useEffect, useState} from "react";
import authService from "../../../Services/AuthService";
import axios from "axios";
import {PageNotFound} from "../PageNotFound/PageNotFound";
import {HomePage} from "../HomePage/HomePage";
import {CustomerPanel} from "../../CustomerComponents/CustomerPanel/CustomerPanel";
import {PanelRouter} from "../PanelRouter/PanelRouter";


export function Router(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        // Add the interceptor
        const interceptor = axios.interceptors.response.use(
            res => res,
            //err will contain any status that http deems as an error
            err => {
                // as this is meant to mainly filter unauthorized requests we'll look for 401
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem("token")
                    navigate("/login")
                }
                return Promise.reject(err);
            })

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);


    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="login" element={<LoginBox/>}/>
                <Route path="controlpanel" element={<PanelRouter/>}/>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>

        </div>
    );
}
