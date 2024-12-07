export class User {
    email: string;
    password: string;
    clientType: string;


    constructor(email: string, password: string, clientType: string) {
        this.email = email;
        this.password = password;
        this.clientType = clientType;
    }
}