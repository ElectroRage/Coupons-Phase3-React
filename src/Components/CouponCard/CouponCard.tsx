import "./CouponCard.css";
import {Coupon} from "../../Models/Coupon";
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
    Paper
} from "@mui/material";
import React, {useState} from "react";
import {CompanyService} from "../../Services/CompanyService";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {CouponForm} from "../CompanyComponents/CouponForm/CouponForm";


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


    return (
        <div className="CouponCard">
            {isDeleted ?
                null :
                <> {toEdit ?
                    <Backdrop

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
                    :
                    <Card elevation={3} sx={{margin: '10px'}}>
                        <Box sx={{display: "flex", justifyContent: 'right'}}>
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton onClick={handleEdit}>
                                <EditIcon/>
                            </IconButton>
                        </Box>
                        <CardContent>
                            {/*<image src={props.coupon.image}/>*/}
                            <h3>{props.coupon.title}</h3>
                            <div>{props.coupon.category}</div>
                            <div>{props.coupon.endDate.toString()}</div>
                            {/*<div>{props.coupon.company.name}</div>*/}
                            <div>{props.coupon.price}</div>
                            <div>{props.coupon.amount}</div>
                            <div>{props.coupon.description}</div>
                        </CardContent>
                    </Card>}</>}

        </div>
    );
}
