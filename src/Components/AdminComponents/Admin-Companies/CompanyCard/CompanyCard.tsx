import "./CompanyCard.css";
import {Company} from "../../../../Models/Company";
import {
    Backdrop,
    Box,
    Card,
    CardActionArea,
    CardContent,
    IconButton, Typography,
} from "@mui/material";
import React, {useState} from "react";
import {AdminService} from "../../../../Services/AdminService";
import {CompanyForm} from "../CompanyForm/CompanyForm"
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {errorHandler} from "../../../../Utils/ErrorHandler";
import { toast } from "react-toastify";

interface CompanyCardProps {
    company?: Company,
    isUpdated: () => void

}


export function CompanyCard(props: CompanyCardProps): JSX.Element {
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [toEdit, setToEdit] = useState<boolean>(false)
    const adminService = new AdminService();


    function handleDelete() {
        const bool = window.confirm('Are you sure you want to delete ' + props.company?.name + "?");
        if (bool)
            adminService.deleteCompany(props.company!.id)
                .then(data => {
                    toast.success(props.company?.name + " was deleted")
                    setIsDeleted(true)
                    props.isUpdated();
                })
                .catch(err => errorHandler(err))

    }

    function handleEdit() {
        setToEdit(!toEdit)
    }


    return (
        <div className="CompanyCard">

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
                            <CompanyForm
                                isEdit={true}
                                onSubmit={() => {
                                    handleEdit()
                                    props!.isUpdated();
                                }}
                                company={props.company}
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
                                    <Typography noWrap><strong>ID: </strong> {props.company?.id}</Typography>
                                    <Typography noWrap><strong>Company: </strong> {props.company?.name}</Typography>
                                    <Typography marginBottom={1} noWrap><strong>Email: </strong>{props.company?.email}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            }
        </div>
    );
}
