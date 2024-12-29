import "./HomePage.css";
import {AllCompanysComp} from "../../AdminComponents/AllCompanysComp/AllCompanysComp";
import {AllCouponsComp} from "../AllCouponsComp/AllCouponsComp";
import {Image} from "@mui/icons-material";
import React from "react";
import {Card, CardContent, CardMedia} from "@mui/material";

export function HomePage(): JSX.Element {
    return (
        <div className="HomePage">

            {/*{This is where the customer can buy his coupons, so the purchase method will be used here}*/}
            <AllCouponsComp/>
        </div>
    );
}
