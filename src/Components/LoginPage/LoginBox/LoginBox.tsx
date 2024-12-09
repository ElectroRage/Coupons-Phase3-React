import "./LoginBox.css";
import {
    Box,
    Button,
    Card,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormLabel, InputLabel,
    MenuItem,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {ChangeEvent, useState} from "react";
import authService from "../../../Services/AuthService";
import {NavLink, useNavigate} from "react-router-dom";
import {User} from "../../../Models/User";
import {jwtDecode} from "jwt-decode";

interface jwtInfo {
    user: string;
    type: string
    iat: string;
    exp: string;


}

export function LoginBox(): JSX.Element {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [clientType, setClientType] = useState<string>("Customer");

    function handleClientType(event: SelectChangeEvent<string>) {
        setClientType(event.target.value)
    }

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }


    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }


    function sendRequest(event: React.FormEvent) {
        event.preventDefault();
        const user = new User(email, password, clientType)
        authService.login(user)
            .then(token => {
                const decoded = jwtDecode<jwtInfo>(token)
                localStorage.token = token;
                localStorage.setItem("user", decoded.user)
                localStorage.setItem("type", decoded.type)

                navigate("/" + clientType.toLowerCase() + "panel");
            })
            .catch(err => alert("ERROR! " + err.response.data));
    }


    return (
        <div className="LoginBox">
            {localStorage.getItem("token") !== null && localStorage.getItem("token")!.includes("Bearer") ?
                <div>
                    <h3>You're already logged in...</h3>
                    needs to redirect or have logout option
                </div>
                :
                <Card sx={{width:"600px",height:"350px"}}>
                    <CardContent sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "100%",
                    }}>
                        <FormLabel sx={{fontSize: "24px"}}>Sign in</FormLabel>
                        <Box sx={{marginTop:"25px"}}>
                                <form onSubmit={sendRequest}>
                                    <TextField required onChange={handleEmail} placeholder="Email*" type="email"/><br/>
                                    <TextField required onChange={handlePassword} placeholder="Password*"
                                               type="password"/><br/>
                                    {/*<FormControlLabel control={<Checkbox/>} label="Remember me"/>*/}
                                    <Select fullWidth value={clientType} onChange={handleClientType}>
                                        <MenuItem value="" disabled>Account Type</MenuItem>
                                        <MenuItem value="Administrator">Administrator</MenuItem>
                                        <MenuItem value="Company">Company</MenuItem>
                                        <MenuItem value="Customer">Customer</MenuItem>
                                    </Select><br/>
                                    <Button type="submit" size="large" variant="contained"
                                            sx={{backgroundColor: "rebeccapurple"}}>Submit</Button>
                                </form>
                        </Box>
                    </CardContent>
                </Card>
            }
        </div>
    );
}
