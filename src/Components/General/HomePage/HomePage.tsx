import "./HomePage.css";
import {AllCouponsComp} from "../AllCouponsComp/AllCouponsComp";
import React, {createContext, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {tokenProps} from "../PanelRouter/PanelRouter";
import {Coupon} from "../../../Models/Coupon";
import {CustomerService} from "../../../Services/CustomerService";
import {errorHandler} from "../../../Utils/ErrorHandler";

export const OwnedContext = createContext<Coupon[]>([]);

export function HomePage(): JSX.Element {

    const [ownedCoupons, setOwnedCoupons] = useState<Coupon[]>([])

    //retrieves user coupons to check below if they already owned. if they are
    // it'll say owned on the main allcouponscomp
    useEffect(() => {
        if (localStorage.getItem("token")) {
            try {
                const token = localStorage.getItem("token");
                const decode: tokenProps = jwtDecode(token!)
                if (decode.role === "Customer") {
                    const customerService = new CustomerService();
                    customerService.getAll()
                        .then(cCoupons => {
                            setOwnedCoupons(cCoupons)
                            console.log(cCoupons)
                        })
                        .catch(err => errorHandler(err))


                }
            } catch (error) {
                console.log(error)
            }
        }
    }, []);


    return (
        <div className="HomePage">
            <OwnedContext.Provider value={ownedCoupons}>
                {/*{This is where the customer can buy his coupons, so the purchase method will be used here}*/}
                {ownedCoupons!.length > 0 ? <AllCouponsComp customerCoupons={ownedCoupons}/> : <AllCouponsComp/>}
            </OwnedContext.Provider>
        </div>
    );
}
