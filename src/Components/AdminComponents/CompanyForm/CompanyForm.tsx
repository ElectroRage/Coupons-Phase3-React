import "./CompanyForm.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Card,
    FormControl,
    FormLabel,
    TextField
} from "@mui/material";
import {Company} from "../../../Models/Company";
import {ChangeEvent, useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AdminService} from "../../../Services/AdminService";
import {Form} from "react-router-dom";
import {CompanyCard} from "../CompanyCard/CompanyCard";

interface CompanyProps {
    company?: Company;
}


export function CompanyForm(props: CompanyProps): JSX.Element {


    const adminService = new AdminService();
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [formCompany, setFormCompany] = useState<Company | null>(null)
    const [formName, setFormName] = useState<string>('');
    const [formEmail, setFormEmail] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        setFormName(event.target.value);
    }

    function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
        setFormEmail(event.target.value);
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setFormPassword(event.target.value);
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const comp = new Company(0, formName, formEmail, formPassword)
        adminService.addCompany(comp)
            .then(data => {
                setFormCompany(data)
                setIsSubmit(true)
            })
            .catch(err => alert(err.response.data.message))


    }

    return (
        <div className="CompanyForm">

            {isSubmit ?
                <>
                    <h3>{formCompany?.name} has been added.</h3>
                    <CompanyCard key={formCompany?.id} company={formCompany!}/>
                </>
                :
                <Card>
                    <form onSubmit={handleSubmit}>

                        <FormControl margin="dense">
                            <TextField onChange={handleNameChange} className="formData" type="text"
                                       label="Company Name: " variant="outlined"
                                       defaultValue={formName}
                                       required/><br/>
                            <TextField onChange={handleEmailChange} className="formData" type="email"
                                       label="Company Email: " variant="outlined"
                                       defaultValue={formEmail}
                                       required/><br/>
                            <TextField onChange={handlePasswordChange} className="formData" type="password"
                                       label="Password: " variant="outlined"
                                       defaultValue={formPassword}
                                       required/><br/>
                            <Button type="submit" sx={{margin: "10px"}} variant="contained">Add Company</Button>
                        </FormControl>
                    </form>
                </Card>}
        </div>
    );
}
