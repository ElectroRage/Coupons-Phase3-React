import "./CustomerPanel.css";
import React, {createContext, useContext, useEffect, useState} from "react";
import {Customer} from "../../../Models/Customer";
import {CustomerService} from "../../../Services/CustomerService";
import {CustomerCoupons} from "../CustomerCoupons/CustomerCoupons";
import {Box} from "@mui/material";

export const CustomerContext = createContext<Customer | null>(null)

export function CustomerPanel(): JSX.Element {

    const [customer, setCustomer] = useState<Customer | null>()
    const customerService = new CustomerService()

    useEffect(() => {
        customerService.getDetails()
            .then(data => {
                const newCustomer = new Customer(data?.id, data.firstName, data.lastName, data.email, "")
                setCustomer(newCustomer)
            })
            .catch(err => console.log(err.response.data))

    }, []);
    return (
        <div className="CustomerPanel">
            <Box>
                <CustomerContext.Provider value={customer}>
                    <CustomerCoupons/>
                </CustomerContext.Provider>
            </Box>

        </div>
    );
}
