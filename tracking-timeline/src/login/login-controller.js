class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }

    async create(loginUser) {
        const loginCreationInfo = await this.loginService.createLogin(loginUser);

        if (loginCreationInfo.message)
            throw new Error(loginCreationInfo.message);

        return this.logIn(loginUser.username, loginUser.password);
    }

    async logIn(username, password) {
        const loginInfo = await this.loginService.logIn(username, password);
        
        if (loginInfo.message)
            throw new Error(loginInfo.message);

        return loginInfo.token;
    }
}

module.exports = LoginController;