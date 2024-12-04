import "./PageLayout.css";
import {BrowserRouter} from "react-router-dom";
import {Header} from "../Header/Header";
import {Router} from "../../Router/./Router";


export function PageLayout(): JSX.Element {
    return (
        <div className="PageLayout">
            <BrowserRouter>
                <Header/>
                <Router/>
            </BrowserRouter>
        </div>
    );
}
