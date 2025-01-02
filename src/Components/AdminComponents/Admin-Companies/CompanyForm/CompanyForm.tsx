import "./CompanyForm.css";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Button,
    Card,
    FormControl,
    FormLabel,
    TextField, Typography
} from "@mui/material";
import {Company} from "../../../../Models/Company";
import React, {ChangeEvent, useEffect, useState} from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AdminService} from "../../../../Services/AdminService";
import {Form} from "react-router-dom";
import {CompanyCard} from "../CompanyCard/CompanyCard";
import {Coupon} from "../../../../Models/Coupon";
import {errorHandler} from "../../../../Utils/ErrorHandler";
import { toast } from "react-toastify";

interface CompanyProps {
    company?: Company;
    onSubmit?: () => void;
    isEdit: boolean
}


export function CompanyForm(props: CompanyProps): JSX.Element {


    const adminService = new AdminService();
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [formCompany, setFormCompany] = useState<Company | null>(null)
    const [formName, setFormName] = useState<string>('');
    const [formEmail, setFormEmail] = useState<string>('');
    const [formPassword, setFormPassword] = useState<string>('');

    useEffect(() => {
        if (props?.company) {
            setFormCompany(props.company);
            setFormName(props.company.name);
            setFormEmail(props.company.email);
        } else {

        }
    }, [props?.company, formCompany]);

    function init() {
        setFormCompany(null)
        setFormName("")
        setFormEmail("")
        setFormPassword("")
        setIsSubmit(false)
    }

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
        event.preventDefault()
        const company = new Company(0, formName, formEmail, formPassword)
        if (props?.company) {
            company.id = props.company.id
            console.log(company)
            adminService.updateCompany(company)
                .then(company => {
                    setFormCompany(company)
                    setIsSubmit(true)
                    if (props.onSubmit) {
                        props.onSubmit();
                    }
                    toast.success(company.name + "Has Been Successfully Updated")
                })
                .catch(err => {
                    errorHandler(err)
                })
        } else {

            adminService.addCompany(company)
                .then((company) => {
                    setFormCompany(company)
                    setIsSubmit(true)
                    toast.success(company.name + "Has Been Successfully Added.")
                    init();
                })
                .catch(err => {
                    errorHandler(err)
                })
        }


    }

    return (
        <div className="CompanyForm">
            <Card sx={{
                justifySelf: "center",
                marginTop: "20px",
                marginBottom: "20px",
                width: "70rem",
                display: "flex",
                flexDirection: "column",
                padding: "35px"

            }}
            >
                <Box alignSelf={"flex-start"} marginBottom={"20px"}>
                    <Typography variant={"h5"}>{props.isEdit ? "Edit Company:" : "Add Company:"}</Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        justifyContent: "center",
                        width: "100%"
                    }}>

                        <TextField onChange={handleNameChange} className="formData" type="text"
                                   label="Company Name: " variant="outlined" disabled={props.isEdit}
                                   value={formName}
                                   required/>
                        <TextField onChange={handleEmailChange} className="formData" type="email"
                                   label="Company Email: " variant="outlined"
                                   value={formEmail}
                                   required/>
                        <TextField onChange={handlePasswordChange} className="formData" type="password"
                                   label="Password: " variant="outlined"
                                   value={formPassword}
                                   required/>
                    </Box>
                    <Button type="submit" sx={{marginTop: "25px"}} variant="contained">Submit</Button>
                </form>
            </Card>
        </div>
    );
}
