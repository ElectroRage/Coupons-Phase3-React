import axios, {HttpStatusCode} from "axios";
import {User} from "../Models/User";


class AuthService {

    async login(user: User) {
        console.log(user)
        return (await axios.post<string>("http://localhost:8080/login", user)).data
    }

    async logout(token: string) {
        return (await axios.post<boolean>(`http://localhost:8080/logout/${token!}`)).data
    }

    async validate(token:string){
        return (await axios.post<boolean>(`http://localhost:8080/validate/${token!}`)).data

    }



}

const authService = new AuthService();
export default authService