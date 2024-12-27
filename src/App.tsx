import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import {Router} from "./Components/General/Router/Router";
import AppBar from "@mui/material/AppBar";
import {Box, Button, Toolbar, Typography} from "@mui/material";
import authService from "./Services/AuthService";
import axios from "axios";

function App() {

    const navigate =    useNavigate();

    //TODO: doesnt work on refresh when the client is at an unauthorized route
    useEffect(() => {
        // ternary of  if the type of navigation is equals to refresh, if so, set reload
        const navigateType =  (performance.navigation?.type === 1 ? "reload" : "navigate")
        //check if the user refreshed
        if (navigateType === "reload") {
            const token = localStorage.getItem("token");
            if (token) {
                //if token is in the token list
                authService.validate(token)
                    .then(
                        bool => {
                    if (!bool) {
                        localStorage.removeItem("token");
                        navigate("/login");
                    }
                })
                    .catch(err=> console.log(err.response.data));
            }
        }
    }, [navigate]);

    function barLogout() {
        authService.logout(localStorage.getItem("token")!)
            .then(bool => {
                if (bool) {
                    localStorage.clear()
                    navigate("/");
                }
            })
            .catch(err => {
                    alert(err.response.data)
                    localStorage.clear()
                    navigate("/");

                }
            )


    }


    return (
        <div className="App">
            <Box sx={{flexGrow: 1}}>
                <AppBar sx={{
                    position: "static",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: " 10vh",
                    backgroundColor: "rebeccapurple"
                }}>

                    <Toolbar>
                        <Box sx={{flexGrow: 1, textAlign: 'left'}} onClick={() => navigate("/")}>
                            <Typography variant={'h3'}>Coupons Control Panel</Typography>
                        </Box>

                        {localStorage.getItem("token") ?
                            <Button color="inherit" onClick={barLogout}>Logout</Button> :
                            <Button onClick={() => navigate("/login")} disableRipple color="inherit"
                                    sx={{textAlign: 'right'}}>
                                Login
                            </Button>
                        }

                    </Toolbar>

                </AppBar>
            </Box>
            <Router/>
        </div>
    );
}

export default App;
