import "./PanelRouter.css";
import {AdminPage} from "../../AdminComponents/AdminPage/AdminPage";
import {CustomerPanel} from "../../CustomerComponents/CustomerPanel/CustomerPanel";
import {CompanyPanel} from "../../CompanyComponents/CompanyPanel/CompanyPanel";
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";

export interface tokenProps {
    role: string
}


export function PanelRouter(): JSX.Element {

    const [role, setRole] = useState<string>("")

    useEffect(() => {
        if (localStorage.getItem("token")) {
            try {
                const token = localStorage.getItem("token")?.slice(7)
                const decode: tokenProps = jwtDecode(token!)
                console.log(decode.role)
                setRole(decode.role)
            } catch (error) {
                console.log(error)
            }
        }
    }, [role]);

    return (<div className="PanelRouter">
            {role === "Administrator" ? (
                <AdminPage/>
            ) : role === "Customer" ? (
                <CustomerPanel/>
            ) : role === "Company" ? (
                <CompanyPanel/>
            ) : (
                <p>Access denied, Invalid Data or Role.</p>
            )}
        </div>
    );
}
