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
                setCompany(c)
            })
            .catch(err => {
                console.log(err.response.data)
            });

    }, []);


    return (

        <div className="CompanyPanel">
            {company ?
                <Box>
                    <CompanyContext.Provider value={company}>
                        <CouponForm/>
                        <CompanyCoupons/>
                    </CompanyContext.Provider>
                </Box>
                :
                <Typography variant={"h2"}>Fetching Data...</Typography>
            }
        </div>
    )
        ;
}
