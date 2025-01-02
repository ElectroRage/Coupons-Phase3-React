import "./CompanyPanel.css";
import {CouponForm} from "../CouponForm/CouponForm";
import {createContext, useContext, useEffect, useState} from "react";
import {Company} from "../../../Models/Company";
import {CompanyService} from "../../../Services/CompanyService";
import {CompanyCoupons} from "../CompanyCoupons/CompanyCoupons";
import {Box, Card, Typography} from "@mui/material";

export const CompanyContext = createContext<Company | null>(null);


export function CompanyPanel(): JSX.Element {

    const [company, setCompany] = useState<Company | null>(null)
    const companyService = new CompanyService();

    useEffect(() => {
        companyService.getDetails()
            .then(c => {
                const newCompany = new Company(c.id, c.name, c.email, "");
                console.log(newCompany)
                setCompany(newCompany)
            })
            .catch(err => {
                console.log(err.response.data)
            });

    }, []);


    return (

        <div className="CompanyPanel">
            <Box>
                <CompanyContext.Provider value={company}>
                    <Box sx={{width: 1100, display: "flex", justifyContent: "space-between"}}>
                    </Box>
                    <CouponForm/>
                    <CompanyCoupons/>
                </CompanyContext.Provider>
            </Box>
        </div>
    )
        ;
}
