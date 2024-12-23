import "./CouponForm.css";
import React, {ChangeEvent, useState, useEffect, useContext} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Box,
    Button, Card,
    FormControl,
    Grid, MenuItem,
    Paper, Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {CompanyService} from "../../../Services/CompanyService";
import {Coupon} from "../../../Models/Coupon";
import {Company} from "../../../Models/Company";
import {CouponCard} from "../../CouponCard/CouponCard";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";

interface couponFormpProps {
    coupon?: Coupon;
}

export function CouponForm(props?: couponFormpProps): JSX.Element {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [start, setStart] = useState<string>(new Date().toISOString().split('T')[0]);
    const [end, setEnd] = useState<string>(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<string>("Select Category")
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const companyContext = useContext<Company | null>(CompanyContext!);
    const companyService = new CompanyService();


    function handleTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function handleDescription(event: ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value)
    }

    function handleStartDate(event: ChangeEvent<HTMLInputElement>) {
        setStart(event.target.value)
    }

    function handleEndDate(event: ChangeEvent<HTMLInputElement>) {
        setEnd(event.target.value)
    }

    function handleAmount(event: ChangeEvent<HTMLInputElement>) {
        setAmount(+event.target.value)
    }

    function handlePrice(event: ChangeEvent<HTMLInputElement>) {
        setPrice(+event.target.value)
    }

    function handleImage(event: ChangeEvent<HTMLInputElement>) {
        setImage(event.target.value)
    }

    function handleCategory(event: SelectChangeEvent<string>) {
        setCategory(event.target.value)
    }


    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(companyContext)
        const coupon = new Coupon(0, companyContext!, category, title,
            description, new Date(start), new Date(end), amount, price, image)
        companyService.addCoupon(coupon)
            .then((coupon) => {
                console.log(coupon)
                setCoupon(coupon)
                setIsSubmit(true)
            })
            .catch(err => alert(err.response.data))


    }


    return (
        <div className="CouponForm">

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <h3>New Coupon</h3>
                </AccordionSummary>
                <AccordionDetails>
                    {isSubmit ?
                        <>
                            <CouponCard key={coupon!.id} companyName={companyContext!.name} coupon={coupon!}/>
                        </>
                        :
                        <form onSubmit={handleSubmit}>
                            <Card elevation={3}>
                                <FormControl>
                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <FormControl margin="dense">
                                                <TextField value={companyContext?.name ?? "..."} label="" disabled
                                                           type="text"/>
                                                <TextField value={start} label="Start Date:" type="date"
                                                           onChange={handleStartDate}/>
                                                <TextField value={price} label="Price:" type="number"
                                                           onChange={handlePrice}/>
                                                <Select
                                                    defaultValue={props?.coupon?.category} value={category}
                                                    onChange={handleCategory}>
                                                    <MenuItem value={"default"} disabled>Select Category</MenuItem>
                                                    <MenuItem value={"Food"}>Food</MenuItem>
                                                    <MenuItem value={"Electricity"}>Electricity</MenuItem>
                                                    <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                                                    <MenuItem value={"Vacation"}>Vacation</MenuItem>
                                                    <MenuItem value={"Shopping"}>Shopping</MenuItem>
                                                    <MenuItem value={"Leisure"}>Leisure</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item>
                                            <FormControl margin="dense">
                                                <TextField defaultValue={props?.coupon?.title} value={title}
                                                           label="Title" type="text"
                                                           onChange={handleTitle}/>
                                                <TextField defaultValue={props?.coupon?.endDate} value={end}
                                                           label="End Date" type="date"
                                                           onChange={handleEndDate}/>
                                                <TextField defaultValue={props?.coupon?.amount} value={amount}
                                                           label="Amount for Sale" type="number"
                                                           onChange={handleAmount}/>
                                                <TextField defaultValue={props?.coupon?.image} value={image}
                                                           label="Image Path" type="text"
                                                           onChange={handleImage}/>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <FormControl margin="dense">
                                        <TextField defaultValue={props?.coupon?.description} value={description}
                                                   label="Description" multiline maxRows={4}
                                                   type="text"
                                                   onChange={handleDescription}/>
                                        <Button type="submit" variant="contained" fullWidth>Add New Coupon</Button>
                                    </FormControl>
                                </FormControl>
                            </Card>
                        </form>
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
