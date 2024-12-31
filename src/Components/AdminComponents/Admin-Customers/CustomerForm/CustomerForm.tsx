import "./CustomerForm.css";
import {
    Box,
    Button,
    Card,
    FormControl,
    TextField, Typography
} from "@mui/material";
import {Company} from "../../../../Models/Company";
import {ChangeEvent, useEffect, useState} from "react";
import {AdminService} from "../../../../Services/AdminService";
import {CompanyCard} from "../../Admin-Companies/CompanyCard/CompanyCard";
import {Customer} from "../../../../Models/Customer";

interface CustomerProps {
    customer?: Customer,
    isEdit: boolean,
    onSubmit?: () => void
}


export function CustomerForm(props: CustomerProps): JSX.Element {


    const adminService = new AdminService();
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [formCustomer, setFormCustomer] = useState<Customer | null>(null)
    const [customerFN, setCustomerFN] = useState<string>('');
    const [customerLN, setCustomrLN] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function init() {
        setFormCustomer(null)
        setCustomerFN("")
        setCustomrLN('')
        setEmail("")
        setPassword("")
        setIsSubmit(false)

    }


    function handleFirstName(event: ChangeEvent<HTMLInputElement>) {
        setCustomerFN(event.target.value);
    }

    function handleLastName(event: ChangeEvent<HTMLInputElement>) {
        setCustomrLN(event.target.value);
    }

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();
        const customer = new Customer(0, customerFN, customerLN, email, password)
        adminService.addCustomer(customer)
            .then(data => {
                setFormCustomer(data)
                alert(customerFN + " " + customerLN + " Has Been Successfully Added.")
                init()
                setIsSubmit(true)
            })
            .catch(err => alert(err.response.data))


    }

    return (
        <div className="CustomerForm">

            <Card sx={{
                justifySelf: "center",
                marginTop: "20px",
                marginBottom: "20px",
                width: "70rem",
                display: "flex",
                flexDirection: "column",
                padding: "35px",
                position: "relative"
            }}>
                <Box alignSelf={"flex-start"} marginBottom={"20px"}>
                    <Typography variant={"h5"}>{props.isEdit ? "Edit Customer:" : "Add Customer:"}</Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                        justifyContent: "center",
                        width: "100%"
                    }}>

                        <TextField onChange={handleFirstName} className="formData" type="text"
                                   label="FirstName: " variant="outlined"
                                   value={customerFN}
                                   required/>

                        <TextField onChange={handleLastName} label="LastName"
                                   type={"text"}
                                   value={customerLN}
                                   variant={"outlined"} required/>

                        <TextField onChange={handleEmail} className="formData" type="email"
                                   label="Customer Email: " variant="outlined"
                                   value={email}
                                   required/>

                        <TextField onChange={handlePassword} className="formData" type="password"
                                   label="Password: " variant="outlined"
                                   value={password}
                                   required/>
                    </Box>

                    <Button type="submit" sx={{marginTop: "25px"}} variant="contained">Submit</Button>
                </form>
            </Card>
        </div>
    );
}
