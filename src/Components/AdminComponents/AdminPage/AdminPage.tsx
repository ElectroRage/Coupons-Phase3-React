import "./AdminPage.css";
import {AllCompanysComp} from "../AllCompanysComp/AllCompanysComp";
import {CompanyForm} from "../CompanyForm/CompanyForm";

export function AdminPage(): JSX.Element {
    return (
        <div className="AdminPage">
            <AllCompanysComp/>
            <CompanyForm/>
        </div>
    );
}
