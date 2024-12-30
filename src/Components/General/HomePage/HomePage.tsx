import "./HomePage.css";
import {AllCouponsComp} from "../AllCouponsComp/AllCouponsComp";
import React from "react";

export function HomePage(): JSX.Element {
    return (
        <div className="HomePage">

            {/*{This is where the customer can buy his coupons, so the purchase method will be used here}*/}
            <AllCouponsComp/>
        </div>
    );
}
