import "./AllCustomersComp.css";
import React, {useEffect, useState} from "react";
import {Company} from "../../../../Models/Company";
import {AdminService} from "../../../../Services/AdminService";
import {Box, Button, Card, Typography} from "@mui/material";
import {CompanyCard} from "../../Admin-Companies/CompanyCard/CompanyCard";
import {Customer} from "../../../../Models/Customer";
import {CustomerCard} from "../CustomerCard/CustomerCard";
import {errorHandler} from "../../../../Utils/ErrorHandler";

export function AllCustomersComp(): JSX.Element {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const adminService = new AdminService();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12;
    const numOfPages = (Math.ceil(customers?.length / pageSize));


    useEffect(() => {
        console.log("hi")
        adminService.getAllCustomers()
            .then(data => {
                setCustomers(data)
                setIsUpdated(false)
            })
            .catch(err => errorHandler(err))


    }, [isUpdated]);

    function handleNext() {
        if (currentPage < numOfPages) {
            setCurrentPage(currentPage + 1);

        }
    }

    function handlePrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }


    return (
        <div className="AllCustomersComp">
            <Card elevation={3} sx={{
                justifySelf: "center",
                justifyContent: "center",
                height: "35rem",
                width: "70rem",
                padding: "25px",
                marginTop: "50px",
                marginBottom: "100px",
                // overflow: "unset",
            }}>
                <Box sx={{marginBottom: "20px"}}>
                    <Typography variant={"h4"}>Customers List:</Typography>
                </Box>
                {customers.length > 0 ?
                    <Box sx={{position: "relative"}}>
                        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", minHeight: "30rem"}}>
                            {customers
                                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                                .map((c) => (
                                    <CustomerCard
                                        isUpdated={() => {
                                            setIsUpdated(true)
                                        }}
                                        key={c.id}
                                        customer={c}

                                    />
                                ))}
                        </Box>
                        <Box>
                            <Button variant="text" onClick={handlePrev}>{"<<"}</Button>
                            <Typography variant="button">{currentPage} - {numOfPages}</Typography>
                            <Button variant="text" onClick={handleNext}>{">>"}</Button>
                        </Box>
                    </Box>
                    :
                    <Typography variant={"h5"}>No Customers Found...</Typography>}
            </Card>

        </div>
    );
}
