class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
    }

    async create(loginUser) {
        const loginCreationInfo = await this.loginService.createLogin(loginUser);

        if (loginCreationInfo.message)
            throw new Error(loginCreationInfo.message);

        return await this.logIn(loginUser);
    }

    async logIn(loginUser) {
        const loginInfo = await this.loginService.logIn(loginUser);
        
        if (loginInfo.message)
            throw new Error(loginInfo.message);

        return loginInfo.token;
    }
}

module.exports = LoginController;