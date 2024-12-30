import "./AdminPage.css";
import {CompanyForm} from "../Admin-Companies/CompanyForm/CompanyForm";
import {CustomerForm} from "../Admin-Customers/CustomerForm/CustomerForm";
import {Box} from "@mui/material";
import {AllCompaniessComp} from "../Admin-Companies/AllCompaniesComp/AllCompaniesComp";

export function AdminPage(): JSX.Element {
    return (
        <div className="AdminPage">
            <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",justifySelf: "center",}}>
                <Box>
                    <CustomerForm/>
                </Box>
                <Box>
                    <CompanyForm/>
                </Box>
                <AllCompaniessComp/>

            </Box>
        </div>
    );
}
