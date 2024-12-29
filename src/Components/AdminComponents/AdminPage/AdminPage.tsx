import "./AdminPage.css";
import {AllCompanysComp} from "../AllCompanysComp/AllCompanysComp";
import {CompanyForm} from "../CompanyForm/CompanyForm";
import {CustomerForm} from "../CustomerForm/CustomerForm";
import {Box} from "@mui/material";

export function AdminPage(): JSX.Element {
    return (
        <div className="AdminPage">
            <Box sx={{justifySelf:"center"}}>
                <AllCompanysComp/>
                <Box sx={{width: "80%", display: "flex", justifyContent: "space-between"}}>
                    <CustomerForm/>
                    <CompanyForm/>
                </Box>
            </Box>
        </div>
    );
}
