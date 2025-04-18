import "./CompanyCoupons.css";
import {CompanyService} from "../../../Services/CompanyService";
import React, {useContext, useEffect, useState} from "react";
import {Coupon} from "../../../Models/Coupon";
import {CouponCard} from "../CouponCard/CouponCard";
import {Company} from "../../../Models/Company";
import {CompanyContext} from "../CompanyPanel/CompanyPanel";
import {
    Box,
    Button,
    Card,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider, Typography
} from "@mui/material";
import {errorHandler} from "../../../Utils/ErrorHandler";


export function CompanyCoupons(): JSX.Element {
    const company = useContext<Company | null>(CompanyContext!)
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([])
    const [category, setCategory] = useState<string>("all")
    const [cMax, setcMax] = useState<number>(0)
    const [sliderValue, setSilderValue] = useState(cMax);
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const companyService = new CompanyService();

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
            .catch(err => errorHandler(err))


    }, [isUpdated]);

    function handleCategory(event: SelectChangeEvent<string>) {
        const category = event.target.value;
        if (category === "all") {
            setFilteredCoupons(coupons.filter(c => c.price <= sliderValue));
            setCategory(category)

        } else {
            setFilteredCoupons(coupons.filter(c => c.category === category && c.price <= sliderValue));
            setCategory(category)
        }
        setCurrentPage(1)
    }

    function handleSliderChange(event: Event, newValue: number | number[]) {
        setSilderValue(newValue as number);
    }

    function handleCommit(event: React.SyntheticEvent | Event, newValue: number | number[]) {
        const value = newValue as number;
        if (category === "all") {
            setFilteredCoupons(coupons.filter(c => c.price <= value))
            setCurrentPage(1)

        } else {
            setFilteredCoupons(coupons.filter(c => {
                    return c.category === category && c.price <= value
                }
            ))
            console.log(sliderValue)
        }
    }


    return (
        <div className="CompanyCoupons">
            <Card elevation={3} sx={{
                height: 1000,
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
                                    onChangeCommitted={handleCommit}
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={cMax}
                            />
                        </Box>
                    </Box>
                </Box>

                {coupons.length > 0 ?
                    <Box>
                        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center",minHeight:800}}>
                            {filteredCoupons
                                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                                .map((c) => (
                                    <CouponCard
                                        isCustomer={false}
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
                            <Typography variant="button">{currentPage} - {numOfPages >0 ? numOfPages:"1"} </Typography>
                            <Button variant="text" onClick={handleNext}>{">>"}</Button>
                        </Box>
                    </Box>
                    :
                    <Typography variant={"h5"}>No Coupons Found...</Typography>}
            </Card>
        </div>
    );
}