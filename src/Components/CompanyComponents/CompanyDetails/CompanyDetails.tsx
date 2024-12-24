import "./CompanyDetails.css";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useContext} from "react";
import {CompanyCard} from "../../AdminComponents/CompanyCard/CompanyCard";
import {Company} from "../../../Models/Company";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";


export function CompanyDetails(): JSX.Element {
    const companyContext = useContext<Company | null>(CompanyContext!);


    return (
        <div className="CompanyDetails">
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}*/}
            {/*        aria-controls="panel1-content">*/}
            {/*        <h3>Company Details </h3>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
                    <CompanyCard company={companyContext!}/>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}

        </div>
    );
}
