export class Login {
    user: string;
    pass: string;

    constructor(username: string, password: string) {
        this.user = username;
        this.pass = password;
    }
}