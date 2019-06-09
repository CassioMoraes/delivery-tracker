import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})

export class LoginService {

    private serviceURL = 'http://localhost:3030/login';

    constructor(private http: HttpClient) { }

    public createLogin(user: User) {
        const createLoginURL = this.serviceURL + '/create';
        return this.http.post<string>(createLoginURL, user);
    }

    public login(user: User) {
        const loginURL = this.serviceURL + '/logIn';
        return this.http.post<string>(loginURL, user);
    }
}
