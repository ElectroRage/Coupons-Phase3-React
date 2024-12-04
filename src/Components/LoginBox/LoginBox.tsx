import "./LoginBox.css";
import {
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
import authService from "../../Services/AuthService";
import {NavLink, useNavigate} from "react-router-dom";


export function LoginBox(): JSX.Element {

    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("Customer");

    function handleRoleChange(event: SelectChangeEvent<string>) {
        setRole(event.target.value)
    }

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.currentTarget.value)
    }


    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.currentTarget.value)
    }


    function sendRequest(event: React.FormEvent) {
        event.preventDefault();
        authService.login(email, password, role)
            .then(token => {
                localStorage.token = token;
                navigate("/")
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
                <Card>
                    <CardContent>
                        <FormLabel sx={{fontSize: "24px"}}>Sign in</FormLabel>
                        <form onSubmit={sendRequest}>
                            <TextField required onChange={handleEmail} placeholder="Email*" type="email"/><br/>
                            <TextField required onChange={handlePassword} placeholder="Password*" type="password"/><br/>
                            <FormControlLabel control={<Checkbox/>} label="Remember me"/>
                            <Select value={role} onChange={handleRoleChange}>
                                <MenuItem value="" disabled>Account Type</MenuItem>
                                <MenuItem value="Administrator">Administrator</MenuItem>
                                <MenuItem value="Company">Company</MenuItem>
                                <MenuItem value="Customer">Customer</MenuItem>
                            </Select><br/>
                            <Button type="submit" size="large" variant="contained"
                                    sx={{backgroundColor: "rebeccapurple"}}>Submit</Button>
                        </form>
                    </CardContent>
                </Card>
            }
        </div>
    );
}
