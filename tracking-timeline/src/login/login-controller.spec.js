const sinon = require('sinon');

const LoginUser = require('./login-user');
const LoginService = require('./login-service');
const LoginController = require('./login-controller');

const loginService = new LoginService(null);
const loginUser = new LoginUser(
    'francisco@attivilog.com.br',
    'usuário teste',
    'francisco2',
    '123456');

const createLoginStub = sinon.stub(loginService, 'createLogin');
const logInStub = sinon.stub(loginService, 'logIn');

describe('#create()', () => {
    test('should return login token', async () => {
        const requestAnwser = { token: "anyjiberrish" };
        createLoginStub.resolves(loginUser);
        logInStub.resolves(requestAnwser);

        const loginController = new LoginController(loginService);
        const returnedLoginInfo = await loginController.create(loginUser);

        expect(returnedLoginInfo).toBe('anyjiberrish');
    });

    test('should throw error message', async () => {
        const requestAnwser = { message: "Username is already taken." }
        createLoginStub.resolves(requestAnwser);

        const loginController = new LoginController(loginService);

        try {
            await loginController.create(loginUser)
        } catch(e) {
            expect(e.message).toBe('Username is already taken.')
        }
    });
});

describe('#logIn()', () => {
    test('should return login token', async () => {
        const requestAnwser = { token: "anyjiberrish" };;
        logInStub.resolves(requestAnwser);

        const loginController = new LoginController(loginService);
        const returnedLoginInfo = await loginController.logIn(loginUser);

        expect(returnedLoginInfo).toBe('anyjiberrish');
    });

    test('should return "invalid user or password" error message', async () => {
        const loginController = new LoginController(loginService);

        try {
            await loginController.logIn(loginUser)
        } catch(e) {
            expect(e.message).toBe('Invalid user or password.')
        }
    });
});