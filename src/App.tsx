import React from 'react';
import './App.css';
import {LoginBox} from "./Components/LoginPage/LoginBox/LoginBox";
import {Header} from "./Components/Layout-Section/Header/Header";
import {LoginArea} from "./Components/LoginPage/LoginArea/LoginArea";
import {PageLayout} from "./Components/Layout-Section/PageLayout/PageLayout";
import {BrowserRouter} from "react-router-dom";
import {Router} from "./Components/Router/Router";
import AppBar from "@mui/material/AppBar";
import {Toolbar, Typography} from "@mui/material";

function App() {
    return (
        <div className="App">
            <AppBar sx={{
                position: "static",
                top: "0",
                left: "0",
                width: "100%",
                height:" 10vh",
                backgroundColor: "rebeccapurple"
            }}>
                <Toolbar sx={{textAlign:"center"}}>
                    {/*<Typography></Typography>*/}
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </div>
    );
}

export default App;
