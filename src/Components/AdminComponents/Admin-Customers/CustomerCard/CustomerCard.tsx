import "./CustomerCard.css";
import {Customer} from "../../../../Models/Customer";
import React, {useState} from "react";
import {AdminService} from "../../../../Services/AdminService";
import {Backdrop, Box, Card, CardActionArea, CardContent, IconButton, Typography} from "@mui/material";
import {CompanyForm} from "../../Admin-Companies/CompanyForm/CompanyForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {CustomerForm} from "../CustomerForm/CustomerForm";
import {errorHandler} from "../../../../Utils/ErrorHandler";
import { toast } from "react-toastify";

interface CustomerCardProps {
    isUpdated: () => void,
    customer?: Customer,
    isEdit?: boolean,
    onSubmit?: () => void
}

export function CustomerCard(props: CustomerCardProps): JSX.Element {
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [toEdit, setToEdit] = useState<boolean>(false)
    const adminService = new AdminService();


    function handleDelete() {
        const bool = window.confirm('Are you sure you want to delete ' + props.customer?.firstName + " " + props.customer?.lastName + "?");
        if (bool)
            adminService.deleteCustomer(props.customer!.id)
                .then(data => {
                    toast.success(props.customer?.firstName + " " + props.customer?.lastName + " was deleted")
                    setIsDeleted(true)
                    props.isUpdated();
                })
                .catch(err => errorHandler(err))

    }

    function handleEdit() {
        setToEdit(!toEdit)
    }


    return (
        <div className="CustomerCard">
            {isDeleted ?
                null
                :
                <Box>
                    {toEdit ?
                        <Backdrop
                            //probably not the way im supposed to do it
                            sx={{zIndex: 9999}}
                            onClick={e => {
                                // if the event element is backdrop, here to prevent closing the form when we click on it.
                                if (e.target === e.currentTarget) {
                                    handleEdit();
                                }
                            }}
                            open={toEdit}>
                            <CustomerForm
                                isEdit={true}
                                onSubmit={() => {
                                    handleEdit()
                                    props!.isUpdated();
                                }}
                                customer={props.customer}
                            />
                        </Backdrop>
                        : null}

                    <Card elevation={3} sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        margin: "10px",
                        width: "250px",
                        height: "140px",
                        textAlign: "left",

                    }}>
                        <CardActionArea>
                            <Box sx={{justifySelf: "right"}}>
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={handleEdit}>
                                    <EditIcon/>
                                </IconButton>
                            </Box>
                            <CardContent sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }}>
                                <Box>
                                    <Typography noWrap><strong>ID: </strong> {props.customer?.id}</Typography>
                                    <Typography noWrap><strong>Full
                                        Name: </strong>{props.customer?.firstName + " " + props.customer?.lastName}
                                    </Typography>
                                    <Typography marginBottom={1} noWrap><strong>Email: </strong>{props.customer?.email}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>}
                </div>
            );
            }
