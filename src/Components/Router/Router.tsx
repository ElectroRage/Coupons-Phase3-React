import "./Router.css";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {LoginBox} from "../LoginPage/LoginBox/LoginBox";
import {AdminPage} from "../AdminComponents/AdminPage/AdminPage";
import {CompanyPanel} from "../CompanyComponents/CompanyPanel/CompanyPanel";
import React, {useEffect, useState} from "react";
import authService from "../../Services/AuthService";


export function Router(): JSX.Element {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token")
        const email = localStorage.getItem("email")
        if (!token || !email) {
            localStorage.clear()
            alert("Missing Info, Please login")
            // navigate("/login")
            return;
        }
        authService.validate(token, email)
            .then(bool => {
                if (!bool) {
                    localStorage.removeItem("token")
                    alert("Session token expired, please login")
                    // navigate("/login")
                    return
                }

            })


    }, [location]);

    return (
        <div className="Routing">
            <Routes>
                <Route path="login" element={<LoginBox/>}/>
                <Route path="administratorpanel" element={<AdminPage/>}/>
                <Route path="companypanel" element={<CompanyPanel/>}/>
            </Routes>

        </div>
    );
}