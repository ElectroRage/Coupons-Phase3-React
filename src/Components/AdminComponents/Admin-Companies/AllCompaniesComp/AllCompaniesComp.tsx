import "./AllCompaniesComp.css";
import React, {useEffect, useState} from "react";
import {Company} from "../../../../Models/Company";
import {AdminService} from "../../../../Services/AdminService";
import {CompanyCard} from "../CompanyCard/CompanyCard"
import {
    Box, Button,
    Card,
    Typography
} from "@mui/material";
import {errorHandler} from "../../../../Utils/ErrorHandler";


export function AllCompaniessComp(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>([]);
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const adminService = new AdminService();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12;
    const numOfPages = (Math.ceil(companies?.length / pageSize));


    useEffect(() => {
        adminService.getAllCompanies()
            .then(data => {
                setCompanies(data)
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
        <div className="AllCompanysComp">
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
                    <Typography variant={"h4"}>Company List:</Typography>
                </Box>
                {companies.length > 0 ?
                    <Box sx={{position: "relative"}}>
                        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center", minHeight: "30rem"}}>
                            {companies
                                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                                .map((c) => (
                                    <CompanyCard
                                        isUpdated={() => {
                                            setIsUpdated(true)
                                        }}
                                        key={c.id}
                                        company={c}

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
                    <Typography variant={"h5"}>No Coupons Found...</Typography>}
            </Card>

        </div>
    );
}
