import "./AdminPage.css";
import {CompanyForm} from "../Admin-Companies/CompanyForm/CompanyForm";
import {CustomerForm} from "../Admin-Customers/CustomerForm/CustomerForm";
import {Box} from "@mui/material";
import {AllCompaniessComp} from "../Admin-Companies/AllCompaniesComp/AllCompaniesComp";
import {AllCustomersComp} from "../Admin-Customers/AllCustomersComp/AllCustomersComp";

export function AdminPage(): JSX.Element {
    return (
        <div className="AdminPage">
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", justifySelf: "center",}}>

                <Box>
                    <CompanyForm isEdit={false}/>
                </Box>
                <AllCompaniessComp/>
                <Box>
                    <CustomerForm isEdit={false}/>
                </Box>
                <AllCustomersComp/>

            </Box>
        </div>
    );
}
