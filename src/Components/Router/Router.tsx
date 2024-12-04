import "./Router.css";
import {Route, Routes} from "react-router-dom";
import {LoginArea} from "../LoginArea/LoginArea";
import {LoginBox} from "../LoginBox/LoginBox";
import {AdminPage} from "../AdminComponents/AdminPage/AdminPage";
import {AllCompanysComp} from "../AdminComponents/AllCompanysComp/AllCompanysComp";

export function Router(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route path="/login" Component={LoginBox}/>
                <Route path="adminpanel" element={<AdminPage/>}/>
            </Routes>

        </div>
    );
}
