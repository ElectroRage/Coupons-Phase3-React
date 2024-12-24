import "./CompanyCoupons.css";
import {CompanyService} from "../../../Services/CompanyService";
import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import {Coupon} from "../../../Models/Coupon";
import {CouponCard} from "../CouponCard/CouponCard";
import {Company} from "../../../Models/Company";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
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
    const [sliderValue, setSilderValue] = useState(cMax);
    const [maxValue, setMaxValue] = useState(cMax)
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const companyService = new CompanyService;

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 9;
    const numOfPages = (Math.ceil(filteredCoupons?.length / pageSize));

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


    useEffect(() => {
        companyService.getAll()
            .then(data => {
                setCoupons(data)
                setFilteredCoupons(data)
                const temp = Math.max(...data.map(c => c.price))
                setcMax(temp)
                setSilderValue(temp)
                setIsUpdated(false)
            })
            .catch(err => alert(err.response.data.message))


    }, [isUpdated]);

    function handleCategory(event: SelectChangeEvent<string>) {
        const category = event.target.value;
        if (category === "all") {
            setFilteredCoupons(coupons.filter(c => c.price <= sliderValue));

        } else {
            setFilteredCoupons(coupons.filter(c => c.category === category && c.price <= sliderValue));
            setCategory(category)
        }
        setCurrentPage(1)
    }

    function handleSliderChange(event: Event, newValue: number | number[]) {
        setSilderValue(newValue as number);
    }


    return (
        <div className="CompanyCoupons">
            {/*<Accordion>*/}
            {/*    <AccordionSummary*/}
            {/*        expandIcon={<ExpandMoreIcon/>}>*/}
            {/*        <h3>Company Coupons</h3>*/}
            {/*    </AccordionSummary>*/}
            {/*    <AccordionDetails>*/}
            <Card elevation={3} sx={{
                height: 800,
                width: 1160,
                padding: "25px",
                marginTop: "50px",
                marginBottom: "100px",
                overflow: "unset"
            }}>
                <Typography variant={"h4"}>Published Coupons</Typography>
                <Box sx={{flexGrow: 1, display: "flex", justifyContent: "space-between"}}>
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
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    onChangeCommitted={(e) => {
                                        if (category === "all") {
                                            setFilteredCoupons(coupons.filter(c => c.price <= sliderValue))
                                        } else {
                                            setFilteredCoupons(coupons.filter(c => {
                                                return (c.price <= sliderValue && c.category === category)
                                            }))
                                        }
                                        setCurrentPage(1)
                                    }}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={cMax}
                            />
                        </Box>
                    </Box>
                </Box>

                {coupons.length > 0 ?
                    <Box>
                        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                            {filteredCoupons
                                .slice((currentPage - 1) * 9, currentPage * 9)
                                .map((c, i) => (
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
                        <Box>

                            <Button variant="text" onClick={handlePrev}>{"<<"}</Button>
                            <Typography variant="button">{currentPage} - {numOfPages}</Typography>
                            <Button variant="text" onClick={handleNext}>{">>"}</Button>
                        </Box>
                    </Box>
                    :
                    <Typography variant={"h5"}>No Coupons Found...</Typography>}
            </Card>
            {/*    </AccordionDetails>*/}
            {/*</Accordion>*/}

        </div>
    );
}