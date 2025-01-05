import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, useLocation, useNavigate} from "react-router-dom";
import {Router} from "./Components/General/Router/Router";
import AppBar from "@mui/material/AppBar";
import {Box, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import authService from "./Services/AuthService";
import AccountCircle from '@mui/icons-material/AccountCircle';
import {ToastContainer} from 'react-toastify';
import {errorHandler} from "./Utils/ErrorHandler";

function App() {

    const appNavigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        console.log("anchor" + !Boolean(anchorEl))

    };

    const handleControlPanel = () => appNavigate("/controlpanel")

    const handleClose = () => {
        setAnchorEl(null);
        console.log("anchor" + !Boolean(anchorEl))
    };


    useEffect(() => {
        // ternary of  if the type of navigation is equals to refresh, if so, set reload
        const navigateType = (performance.navigation?.type === 1 ? "reload" : "navigate")
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
                                appNavigate("/login");
                            }
                        })
                    .catch(err => errorHandler(err));
            }
        }
    }, [appNavigate]);

    function handleLogin() {
        setAnchorEl(null)
        appNavigate("/login")
    }

    function handleLogOut() {
        authService.logout(localStorage.getItem("token")!)
            .then(bool => {
                if (bool) {
                    localStorage.clear()
                    setAnchorEl(null);
                    appNavigate("/");
                }
            })
            .catch(err => {
                    errorHandler(err)
                    localStorage.clear()
                    setAnchorEl(null);
                    appNavigate("/");

                }
            )
    }


    return (
        <div className="App">
            <ToastContainer/>
            <Box>
                <AppBar sx={{
                    position: "static",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: " 80px",
                    backgroundColor: "rebeccapurple",
                    marginBottom: "30px"
                }}>

                    <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                        <Box onClick={() => appNavigate("/")}>
                            <Typography variant={'h3'}>Coupons Control Panel</Typography>
                        </Box>

                        {localStorage.getItem("token") ?
                            // <Button color="inherit" onClick={barLogout}>Logout</Button>
                            <Box>
                                <IconButton
                                    color={"inherit"}
                                    size={"large"}
                                    onClick={handleMenu}
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu

                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => {
                                        handleControlPanel()
                                        handleClose()
                                    }}>Control Panel</MenuItem>
                                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                                </Menu>
                            </Box>
                            :
                            <Button onClick={handleLogin} disableRipple color="inherit"
                                    sx={{textAlign: 'right'}}>
                                Login
                            </Button>
                        }
                    </Toolbar>

                </AppBar>
            </Box>
            <Router/>
        </div>
    )
        ;
}

export default App;
