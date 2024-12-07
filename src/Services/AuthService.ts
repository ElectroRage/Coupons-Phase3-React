import axios, {HttpStatusCode} from "axios";
import {User} from "../Models/User";


class AuthService {

    async login(user: User) {
        return (await axios.post<User>("http://localhost:8080/login", user)).data
    }

    async logout(token: string) {
        return (await axios.post<string>("http://localhost:8080/logout", token)).data
    }

    async validate(token: string, email: string) {
        return (await axios.post('http://localhost:8080/validate?token=' + token + "email=" + email)).data
    }


}

const authService = new AuthService();
export default authService