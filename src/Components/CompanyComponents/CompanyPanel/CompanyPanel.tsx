import "./CompanyPanel.css";
import {CouponForm} from "../CouponForm/CouponForm";

export function CompanyPanel(): JSX.Element {
    return (
        <div className="CompanyPanel">
            <CouponForm/>
        </div>
    );
}
