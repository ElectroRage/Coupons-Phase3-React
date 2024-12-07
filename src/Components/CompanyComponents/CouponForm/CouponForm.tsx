import "./CouponForm.css";
import React, {ChangeEvent, useState, useEffect} from "react";
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

export function CouponForm(): JSX.Element {

    const [company, setCompany] = useState<Company>();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [start, setStart] = useState<string>(new Date().toISOString().split('T')[0]);
    const [end, setEnd] = useState<string>(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<string>("Select Category")
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const companyService = new CompanyService();


    useEffect(() => {
        companyService.getDetails()
            .then(company => {
                setCompany(new Company(company.id, company.name, company.email, ""))
            }
            )
            .catch(err => console.log(err.response.data));
    },[] );

    useEffect(() => {
        if (company) {
            console.log("Company fetched:", company);
        }
    }, [company]);


    function handleTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
        console.log(company)
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
        console.log(event.target.value)
    }


    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        const coupon = new Coupon(0, company!.id, category, title,
            description, new Date(start), new Date(end), amount, price, image)
        companyService.addCoupon(coupon)
            .then((coupon) => {
                companyService.addCoupon(coupon)
            })
            .catch(err => alert(err.response.data))


    }


    return (
        <div className="CouponForm">

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content">
                    <h3>New Coupon</h3>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>

                        <Card elevation={3}>
                            <FormControl>
                                <Grid container spacing={3}>
                                    <Grid item>
                                        <FormControl margin="dense">
                                            <TextField value={company?.name ?? "..."} label="" disabled type="text"/>
                                            <TextField value={start} label="Start Date:" type="date"
                                                       onChange={handleStartDate}/>
                                            <TextField value={price} label="Price:" type="text" onChange={handlePrice}/>
                                            <Select defaultValue={category} onChange={handleCategory}>
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
                                            <TextField value={title} label="Title" type="text" onChange={handleTitle}/>
                                            <TextField value={end} label="End Date" type="date"
                                                       onChange={handleEndDate}/>
                                            <TextField value={amount} label="Amount for Sale" type="text"
                                                       onChange={handleAmount}/>
                                            <TextField value={image} label="Image Path" type="text"
                                                       onChange={handleImage}/>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <FormControl margin="dense">
                                    <TextField value={description} label="Description" multiline maxRows={4} type="text"
                                               onChange={handleDescription}/>
                                    <Button type="submit" variant="contained" fullWidth>Add New Coupon</Button>
                                </FormControl>
                            </FormControl>
                        </Card>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
