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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {CustomerService} from "../../../Services/CustomerService";


interface CouponCardProps {
    coupon: Coupon
    companyName?: string;
    isUpdated: () => void;
    isCustomer: boolean;
    isPurchased?: boolean;
}

export function CouponCard(props: CouponCardProps) {

    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [toEdit, setToEdit] = useState<boolean>(false)
    const companyService = new CompanyService();
    const customerService = new CustomerService();


    function purchaseCoupon() {
        if (window.confirm("Are you sure you want to purchase " + props.coupon.title + "?")) {
            customerService.purchase(props.coupon)
                .then(() =>
                    alert(props.coupon.title + "was purchased successfully"))
                .catch(err => alert(err.response.data))
        }

    }

    function handleDelete() {
        const bool = window.confirm('Are you sure you want to delete this coupon?(' + props.coupon.title + ')');
        if (bool)
            companyService.deleteCoupon(props.coupon.id)
                .then(data => {
                    alert("coupon: " + props.coupon.id + " was deleted")
                    setIsDeleted(true)
                })
                .catch(err => alert(err.response.data.message))

    }

    function handleEdit() {
        setToEdit(!toEdit)
    }


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
                    <Card elevation={3} sx={{
                        margin: '10px', height: "255px", width: "345px"
                    }}>
                        <CardActionArea>
                            <CardMedia
                                sx={{
                                    minHeight: "110px",
                                    minWidth: "345px",
                                    maxHeight: "110px",
                                    maxWidth: "345px"
                                }}
                                component="img"
                                image={props.coupon.image}
                            />
                            <CardContent sx={{
                                display: "flex",
                                flexDirection: "column",
                                overflow: "hidden",
                                padding: 0

                            }}>
                                <Typography sx={{left: 3, position: "absolute"}}
                                            variant={"h6"}>{props.coupon.title}</Typography>

                                <Box sx={{justifyContent: "space-between", width: "345px", height: "85px"}}>
                                    {/*<div>{props.coupon.category}</div>*/}
                                    {/*/!*<div>{props.coupon.company.name}</div>*!/*/}
                                    <Box sx={{
                                        marginTop: "25px",
                                        width: "345px",
                                        display: "flex",
                                        justifyContent: "space-between",

                                    }}>
                                        {props.coupon.amount > 15 ?
                                            <Typography sx={{marginTop: "10px", marginLeft: "5px"}} variant={"body1"}
                                                        color={"green"}>In stock</Typography> :
                                            <Box sx={{marginTop: "10px", marginLeft: "5px"}}>
                                                {props.coupon.amount === 0 ?
                                                    <Typography color={"#ba2b29"}>Out of
                                                        Stock</Typography>
                                                    :
                                                    <Typography color={"#f5da42"}>Almost
                                                        Out</Typography>
                                                }
                                            </Box>
                                        }
                                        <Box sx={{marginTop: "5px", marginRight: "5px"}}>
                                            <Typography variant={"h6"}>${props.coupon.price}</Typography>
                                        </Box>

                                    </Box>

                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            marginLeft: "5px",
                                            textAlign: "start",
                                            justifySelf: "start"
                                        }}
                                        variant={"body2"}>{props.coupon.description}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    marginLeft: "3px",
                                    marginTop: "20px",
                                    width: "345px",
                                    display: "flex",
                                    justifySelf: "self-end",
                                    justifyContent: "space-between",
                                    alignContent: "center"
                                }}>
                                    <Typography
                                        sx={{color: "gray", marginLeft: "5px", marginTop: "15px"}}
                                        variant="caption"
                                    >
                                        {/*Made By:{props.coupon.company.name}*/}
                                        Expires {new Date(props.coupon.endDate).toLocaleDateString("en-GB")}
                                    </Typography>

                                    {props.isCustomer ? <Box>
                                            {props.isPurchased ?
                                                <Box><Typography sx={{marginRight: "10px"}}
                                                                 variant={"h6"}>Owned</Typography></Box> :
                                                <Box >
                                                    <IconButton>
                                                        <ShoppingCartIcon  sx={{
                                                            color:"white",
                                                            backgroundColor:"green",
                                                            padding:"5px",
                                                            paddingLeft:"10px",
                                                            paddingRight:"10px",
                                                            borderRadius:"5px",
                                                            position:"absolute",
                                                            marginRight:"50px",
                                                            marginTop:"5px",
                                                            zIndex:9999
                                                            }}
                                                                          onClick={purchaseCoupon}/>
                                                    </IconButton>
                                                </Box>}
                                        </Box> :
                                        <Box>
                                            <IconButton onClick={handleDelete}>
                                                <DeleteIcon/>
                                            </IconButton>
                                            <IconButton onClick={handleEdit}>
                                                <EditIcon/>
                                            </IconButton>
                                        </Box>
                                    }
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
            }
        </div>
    );
}
