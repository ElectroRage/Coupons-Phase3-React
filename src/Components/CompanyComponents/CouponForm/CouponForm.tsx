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
    TextField,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {CompanyService} from "../../../Services/CompanyService";
import {Coupon} from "../../../Models/Coupon";
import {Company} from "../../../Models/Company";
import {CouponCard} from "../CouponCard/CouponCard";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";

interface couponFormProps {
    coupon?: Coupon;
    onSubmit?: () => void;

}

export function CouponForm(props?: couponFormProps): JSX.Element {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [start, setStart] = useState<string>(new Date().toISOString().split('T')[0]);
    const [end, setEnd] = useState<string>(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [image, setImage] = useState<string>("");
    const [category, setCategory] = useState<string>("default")
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const companyContext = useContext<Company | null>(CompanyContext!);
    const companyService = new CompanyService();

    useEffect(() => {
        if (props?.coupon) {
            setTitle(props.coupon.title);
            setDescription(props.coupon.description);
            setStart("" + props.coupon.startDate);
            setEnd("" + props.coupon.endDate);
            setAmount(props.coupon.amount);
            setPrice(props.coupon.price);
            setImage(props.coupon.image);
            setCategory(props.coupon.category);
        } else {

        }
    }, [props?.coupon, coupon]);


    function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(companyContext)
        const coupon = new Coupon(0, companyContext!, category, title,
            description, new Date(start), new Date(end), amount, price, image)
        if (props?.coupon) {
            coupon.id = props.coupon.id
            companyService.updateCoupon(coupon)
                .then(coupon => {
                    setCoupon(coupon)
                    setIsSubmit(true)
                    if (props.onSubmit) {
                        props.onSubmit();
                    }
                    alert("Coupon " + coupon.id + " Has Been Successfully Updated")
                })
                .catch(err => alert( err.response.data))
        } else {

            companyService.addCoupon(coupon)
                .then((coupon) => {
                    setCoupon(coupon)
                    setIsSubmit(true)
                    alert(coupon.title + " Has Been Successfully Added.")
                    initializeForm();
                })
                .catch(err => alert(err.response.data))
        }


    }

    function initializeForm() {
        setTitle("");
        setDescription("");
        setStart(new Date().toISOString().split('T')[0]);
        setEnd(new Date().toISOString().split('T')[0]);
        setAmount(0);
        setPrice(0);
        setImage("");
        setCategory("default")
        setIsSubmit(false);
        setCoupon(null);

    }



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



    return (
        <div className="CouponForm">

            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}>*/}
            {/*        <h3>New Coupon</h3>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            <form onSubmit={handleSubmit}>
                <Card elevation={3} sx={{position: "relative", padding: "25px"}}>
                    <Box sx={{left: 0}}>
                        <Typography variant={"h4"}>Create Coupon</Typography>
                    </Box>
                    <FormControl sx={{textAlign: "center"}}>
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
                                        sx={{marginTop: "2%", width: "96%", marginLeft: "2%"}}
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
                                    <TextField value={title}
                                               label="Title" type="text"
                                               onChange={handleTitle}/>
                                    <TextField value={end}
                                               label="End Date" type="date"
                                               onChange={handleEndDate}/>
                                    <TextField value={amount}
                                               label="Amount for Sale" type="number"
                                               onChange={handleAmount}/>
                                    <TextField value={image}
                                               label="Image Path" type="text"
                                               onChange={handleImage}/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl margin="dense">
                            <TextField value={description}
                                       label="Description" multiline maxRows={4}
                                       type="text"
                                       onChange={handleDescription}
                            />
                            {props?.coupon ?
                                <Button type="submit" variant="contained" fullWidth>Update Coupon</Button> :
                                <Button type="submit" variant="contained" fullWidth>Add New Coupon</Button>}
                        </FormControl>
                    </FormControl>
                </Card>
            </form>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}
        </div>
    );
}
