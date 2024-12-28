import "./HomePage.css";
import {AllCompanysComp} from "../../AdminComponents/AllCompanysComp/AllCompanysComp";
import {AllCouponsComp} from "../AllCouponsComp/AllCouponsComp";

export function HomePage(): JSX.Element {
    return (
        <div className="HomePage">
            {/*{This is where the customer can buy his coupons, so the purchase method will be used here}*/}
            <AllCouponsComp/>
        </div>
    );
}
