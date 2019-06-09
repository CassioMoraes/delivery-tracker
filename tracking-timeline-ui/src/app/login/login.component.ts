import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../shared/user';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent {
    errorMessage = '';
    isCreatingLogin = false;
    user: User;

    @Output() loggedUserEmmiter = new EventEmitter<User>();

    constructor(private loginService: LoginService) {
        this.user = new User();
    }

    public hasAccount(hasAccount) {
        this.isCreatingLogin = !hasAccount;
    }

    public createAccount() {
        this.errorMessage = this.validateUserWhenCreatingAccount(this.user);

        if (this.errorMessage) {
            return;
        }

        this.loginService.createLogin(this.user)
            .subscribe(
                res => {
                    console.log('response', res);
                    this.user.accessToken = res;
                    this.loggedUserEmmiter.emit(this.user);
                },
                err => {
                    console.log('err', err);
                    this.errorMessage = err.error;
                });
    }

    validateUserWhenCreatingAccount(user: User): string {
        if (!user.fullname) {
            return 'Nome completo de usuário não informado';
        } else if (!user.email) {
            return 'Email de usuário não informado';
        } else if (!user.username) {
            return 'Nome de usuário não informado';
        } else if (!user.password) {
            return 'Senha não informada';
        }

        return '';
    }

    public logIn() {
        this.errorMessage = this.validateUserWhenLogin(this.user);

        if (this.errorMessage) {
            return;
        }

        this.loginService.login(this.user)
            .subscribe(
                res => {
                    console.log('response', res);
                    this.user.accessToken = res;
                    this.loggedUserEmmiter.emit(this.user);
                },
                err => {
                    console.log('err', err);
                    this.errorMessage = err.error;
                });
    }

    validateUserWhenLogin(user: User): string {
        if (!user.username) {
            return 'Nome de usuário não informado';
        } else if (!user.password) {
            return 'Senha não informada';
        }

        return '';
    }
}
