import "./CompanyCoupons.css";
import {CompanyService} from "../../../Services/CompanyService";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Coupon} from "../../../Models/Coupon";
import {CouponCard} from "../../CouponCard/CouponCard";
import {Company} from "../../../Models/Company";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider, Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function CompanyCoupons(): JSX.Element {
    const company = useContext<Company | null>(CompanyContext!)
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([])
    const [category, setCategory] = useState<string>("all")
    const [cMax, setcMax] = useState<number>(0)
    const [value, setValue] = useState(cMax);
    const [isUpdated, setIsUpdated] = useState<boolean>(false)


    const companyService = new CompanyService;

    useEffect(() => {
        companyService.getAll()
            .then(data => {
                setCoupons(data)
                setFilteredCoupons(data)
                const temp = Math.max(...data.map(c => c.price))
                setcMax(temp)
                setValue(temp)
                setIsUpdated(false)
            })
            .catch(err => alert(err.response.data.message))


    }, [isUpdated]);

    function handleCategory(event: SelectChangeEvent<string>) {
        const category = event.target.value;
        if (category === "all") {
            setFilteredCoupons(coupons.filter(c => c.price <= value));
        } else {
            setFilteredCoupons(coupons.filter(c => c.category === category && c.price <= value));
            setCategory(category)
        }
    }

    function handleSliderChange(event: Event, newValue: number | number[]) {
        setValue(newValue as number);
        if (category === "all")
            setFilteredCoupons(coupons.filter(c => c.price <= newValue))
        else {
            setFilteredCoupons(coupons.filter(c => {
                return (c.price <= newValue && c.category === category)
            }))
        }
    }


    return (
        <div className="CompanyCoupons">
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}>*/}
            {/*        <h3>Company Coupons</h3>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
                    <Card elevation={3}>
                        <Box margin={"20px"}
                             display={"flex"}
                             justifyContent={"space-between"}>

                            <Box>
                                <Select defaultValue={"all"} onChange={handleCategory}>
                                    <MenuItem value={"all"}>Show All</MenuItem>
                                    <MenuItem value={"Food"}>Food</MenuItem>
                                    <MenuItem value={"Electricity"}>Electricity</MenuItem>
                                    <MenuItem value={"Restaurant"}>Restaurant</MenuItem>
                                    <MenuItem value={"Vacation"}>Vacation</MenuItem>
                                    <MenuItem value={"Shopping"}>Shopping</MenuItem>
                                    <MenuItem value={"Leisure"}>Leisure</MenuItem>
                                </Select>
                            </Box>
                            <Box>
                                <Box
                                    textAlign={"center"}
                                    margin={"5px"}
                                >
                                    <Typography>Price Range:</Typography>
                                    <Slider sx={{right: 0, width: "300px"}}
                                            value={value}
                                            onChange={handleSliderChange}
                                            valueLabelDisplay="auto"
                                            min={0}
                                            max={cMax}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        {coupons.length > 0 ?
                            <Box display={"flex"} flex={"wrap"}>
                                {filteredCoupons.map(c => (
                                    <CouponCard
                                        isUpdated={() => {
                                            setIsUpdated(true)
                                        }}
                                        key={c.id}
                                        coupon={c}
                                        companyName={company?.name}
                                    />
                                ))}
                            </Box>
                            :
                            <div>Loading</div>}
                    </Card>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}

        </div>
    );
}