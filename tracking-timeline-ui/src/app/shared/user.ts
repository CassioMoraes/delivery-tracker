export class User {
    fullname: string;
    email: string;
    username: string;
    password: string;
    accessToken: string;

    constructor() {
        this.fullname = '';
        this.email = '';
        this.username = '';
        this.password = '';
    }
}
