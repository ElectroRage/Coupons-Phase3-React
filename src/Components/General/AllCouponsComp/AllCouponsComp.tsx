import React, {useContext, useEffect, useState} from "react";
import {Coupon} from "../../../Models/Coupon";
import {
    Box,
    Button,
    Card,
    MenuItem,
    Select,
    SelectChangeEvent,
    Slider, Typography
} from "@mui/material";
import {CustomerService} from "../../../Services/CustomerService";
import {CouponCard} from "../../CompanyComponents/CouponCard/CouponCard";
import {CompanyContext} from "../../CompanyComponents/CompanyPanel/CompanyPanel";
import {OwnedContext} from "../HomePage/HomePage";
import {errorHandler} from "../../../Utils/ErrorHandler";


interface AllCouponsCompProps {
    //based on this list we will know what coupon to mark as owned, will only be used for a logged in customer.
    customerCoupons?: Coupon[]
}

export function AllCouponsComp(props: AllCouponsCompProps): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>([])
    const [filteredCoupons, setFilteredCoupons] = useState<Coupon[]>([])
    const [category, setCategory] = useState<string>("all")
    const [cMax, setcMax] = useState<number>(0)
    const [sliderValue, setSilderValue] = useState(cMax);
    const [isUpdated, setIsUpdated] = useState<boolean>(false)
    const ownedContext = useContext<Coupon[]>(OwnedContext!)
    const customerService = new CustomerService();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = 12;
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
         customerService.getGeneralCoupons()
            .then(data => {
                setCoupons(data)
                setFilteredCoupons(data)
                const temp = Math.max(...data.map(c => c.price))
                setcMax(temp)
                setSilderValue(temp)
                setIsUpdated(false)
            })
            .catch(err => errorHandler(err))


    }, []);

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
        <div className="AllCouponsComp">
            <Card elevation={3} sx={{
                minHeight: "90%",
                width: "85%",
                padding: "25px",
                marginTop: "50px",
                marginBottom: "100px",
                overflow: "unset",
                justifySelf: "center",
                textAlign: "center"
            }}>
                <Typography variant={"h4"}>Coupon Catalogue</Typography>
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
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
                    <Box sx={{}}>
                        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center",}}>
                            {filteredCoupons
                                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                                .map((c) => (
                                    <CouponCard
                                        isCustomer={true}
                                        isPurchased={Boolean(ownedContext.some(coupon => coupon.id === c.id))}
                                        isUpdated={() => {
                                            setIsUpdated(!isUpdated)
                                        }}
                                        key={c.id}
                                        coupon={c}
                                    />
                                ))}
                        </Box>
                        <Box>
                            <Button variant="text" onClick={handlePrev}>{"<<"}</Button>
                            <Typography
                                variant="button">{currentPage} - {numOfPages > 0 ? numOfPages : "1"}</Typography>
                            <Button variant="text" onClick={handleNext}>{">>"}</Button>
                        </Box>
                    </Box>
                    :
                    <Typography variant={"h5"}>No Coupons Found...</Typography>}
            </Card>
        </div>
    );
}