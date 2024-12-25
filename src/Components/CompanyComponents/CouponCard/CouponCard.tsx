import "./CouponCard.css";
import {Coupon} from "../../../Models/Coupon";
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Modal,
    Paper,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {CompanyService} from "../../../Services/CompanyService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CouponForm} from "../CouponForm/CouponForm";


interface CouponCardProps {
    coupon: Coupon
    companyName?: string;
    isUpdated: () => void;
}

export function CouponCard(props: CouponCardProps) {

    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [toEdit, setToEdit] = useState<boolean>(false)
    const companyService = new CompanyService();

    function handleDelete() {
        const bool = window.confirm("Are you sure you want to delete this coupon?(id:" + props.coupon.id + ")");
        if (bool)
            companyService.deleteCoupon(props.coupon.id)
                .then(data => {
                    alert("coupon: " + props.coupon.id + " was deleted")
                    setIsDeleted(true)
                })
                .catch(err => alert(err.response.data))

    }

    function handleEdit() {
        setToEdit(!toEdit)
    }

    console.log(props.coupon.image)

    return (
        <div className="CouponCard">
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
                            <CouponForm onSubmit={() => {
                                handleEdit()
                                props!.isUpdated();
                            }} coupon={props.coupon}/></Backdrop>
                        : null}
                    <Card elevation={3} sx={{margin: '10px', width: 345}}>
                        <CardActionArea>
                            <Box sx={{display: "flex", justifyContent: 'right'}}>
                                <IconButton onClick={handleDelete}>
                                    <DeleteIcon/>
                                </IconButton>
                                <IconButton onClick={handleEdit}>
                                    <EditIcon/>
                                </IconButton>
                            </Box>
                            <CardContent>
                                <CardMedia
                                    component="img"
                                    image={props.coupon.image}
                                />
                                <Grid>
                                    <Typography>{props.coupon.title}</Typography>
                                    <div>{props.coupon.category}</div>
                                    <div>{props.coupon.endDate.toString()}</div>
                                    {/*<div>{props.coupon.company.name}</div>*/}
                                    <div>{props.coupon.price}</div>
                                    <div>{props.coupon.amount}</div>
                                </Grid>
                                <Typography>{props.coupon.description}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            }
        </div>
    );
}
