import React from 'react';
import './App.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import {Router} from "./Components/Router/Router";
import AppBar from "@mui/material/AppBar";
import {Box, Button, Toolbar, Typography} from "@mui/material";

function App() {
    const navigate = useNavigate();
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
                            <Button color="inherit" onClick={() => {
                                localStorage.clear()
                                navigate("/");
                            }}>Logout</Button> :
                            <Button onClick={() => navigate("/login")} disableRipple	 color="inherit" sx={{textAlign: 'right'}}>
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
