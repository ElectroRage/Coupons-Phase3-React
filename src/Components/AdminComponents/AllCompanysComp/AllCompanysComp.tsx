import "./AllCompanysComp.css";
import {useEffect, useState} from "react";
import {Company} from "../../../Models/Company";
import {AdminService} from "../../../Services/AdminService";
import {CompanyCard} from "../CompanyCard/CompanyCard";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Accordion, AccordionDetails, AccordionSummary, Card, Grid} from "@mui/material";


export function AllCompanysComp(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);
    const adminService = new AdminService();

    useEffect(() => {
        adminService.getAllCompanies()
            .then(data => setCompanies(data))
            .catch(err => console.log(err.response.data))

    }, []);


    console.log(companies)
    return (
        <div className="AllCompanysComp">
            <Accordion sx={{width: "70%", margin: "10px"}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content">
                    <h3>All Companies</h3>
                </AccordionSummary>
                <AccordionDetails>
                    {companies.length > 0 ? companies.map((c) =>
                        <CompanyCard key={c.id} company={c}/>) : <p>Loading Data...</p>}
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
