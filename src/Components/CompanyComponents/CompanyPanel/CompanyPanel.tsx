import "./CompanyPanel.css";
import {CouponForm} from "../CouponForm/CouponForm";
import {CompanyDetails} from "../CompanyDetails/CompanyDetails";
import {createContext, useContext, useEffect, useState} from "react";
import {Company} from "../../../Models/Company";
import {CompanyService} from "../../../Services/CompanyService";
import {CompanyCoupons} from "../CompanyCoupons/CompanyCoupons";
import {Card} from "@mui/material";

export const CompanyContext = createContext<Company | null>(null);

export function CompanyPanel(): JSX.Element {

    const [company, setCompany] = useState<Company | null>(null)
    const companyService = new CompanyService();

    useEffect(() => {
        companyService.getDetails()
            .then(c => {
                    const newCompany = new Company(c.id, c.name, c.email, "");
                    setCompany(newCompany)
            })
            .catch(err => console.log(err.response.data));

    },[]);

    return (
        <div className="CompanyPanel">
            <Card elevation={3} sx={{width:"90%"}}>
            <CompanyContext.Provider value={company}>
            <CouponForm/>
             <CompanyCoupons/>
            <CompanyDetails/>
            </CompanyContext.Provider>
            </Card>
        </div>
    );
}
