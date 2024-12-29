import "./CustomerForm.css";
import {
    Button,
    Card,
    FormControl,
    TextField
} from "@mui/material";
import {Company} from "../../../Models/Company";
import {ChangeEvent, useState} from "react";
import {AdminService} from "../../../Services/AdminService";
import {CompanyCard} from "../CompanyCard/CompanyCard";
import {Customer} from "../../../Models/Customer";

interface CustomerProps {
    customer?: Customer;
}


export function CustomerForm(props: CustomerProps): JSX.Element {


    const adminService = new AdminService();
    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [formCustomer, setFormCustomer] = useState<Customer | null>(null)
    const [customerFN, setCustomerFN] = useState<string>('');
    const [customerLN, setCustomrLN] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
                setIsSubmit(true)
            })
            .catch(err => alert(err.response.data.message))


    }

    return (
        <div className="CustomerForm">

            {isSubmit ?
                <>
                    <h3>{formCustomer?.firstName + " " + formCustomer?.lastName} has been added.</h3>\
                    {/*<CompanyCard key={formCustomer?.id} company={formCustomer!}/>*/}
                </>
                :
                <Card>
                    <form onSubmit={handleSubmit}>

                        <FormControl margin="dense">
                            <TextField onChange={handleFirstName} className="formData" type="text"
                                       label="FirstName: " variant="outlined"
                                       defaultValue={customerFN}
                                       required/><br/>
                            <TextField onChange={handleLastName} label="LastName"
                                       type={"text"}
                                       variant={"outlined"} />
                            <TextField onChange={handleEmail} className="formData" type="email"
                                       label="Customer Email: " variant="outlined"
                                       defaultValue={email}
                                       required/><br/>
                            <TextField onChange={handlePassword} className="formData" type="password"
                                       label="Password: " variant="outlined"
                                       defaultValue={password}
                                       required/><br/>
                            <Button type="submit" sx={{margin: "10px"}} variant="contained">Add Company</Button>
                        </FormControl>
                    </form>
                </Card>}
        </div>
    );
}
