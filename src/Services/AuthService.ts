import axios, {HttpStatusCode} from "axios";

class AuthService {

    async login(email: string, password: string, role: string) {
        return (await axios.post<string>(`http://localhost:8080/login?email=${email}&password=${password}&clientType=${role}`)).data
    }

}

const authService = new AuthService();
export default authService