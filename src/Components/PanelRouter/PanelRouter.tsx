import "./PanelRouter.css";
import {AdminPage} from "../AdminComponents/AdminPage/AdminPage";
import {CustomerPanel} from "../CustomerComponents/CustomerPanel/CustomerPanel";
import {CompanyPanel} from "../CompanyComponents/CompanyPanel/CompanyPanel";

export function PanelRouter(): JSX.Element {
    return (
        <div className="PanelRouter">
            <AdminPage/>
            <CustomerPanel/>
            <CompanyPanel/>
        </div>
    );
}
