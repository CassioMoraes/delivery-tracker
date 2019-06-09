const sinon = require('sinon');
const request = require('request-promise');

const LoginUser = require('./login-user');
const LoginService = require('./login-service');

const loginUser = new LoginUser(
    'francisco@attivilog.com.br',
    'usuário teste',
    'francisco2',
    '123456');

const requestStub = sinon.stub(request, 'Request');

describe('#createLoin()', () => {
    test('should return create login information', async () => {
        const requestAnwser = '{"id": 2,"fullname": "usuário teste","email": "francisco@attivilog.com.br","username": "francisco2","end_trial_date": null}'
        requestStub.resolves(requestAnwser);

        const loginService = new LoginService(request);
        const returnedLoginInfo = await loginService.createLogin(loginUser);

        expect(returnedLoginInfo.id).toBe(2);
        expect(returnedLoginInfo.fullname).toBe("usuário teste");
        expect(returnedLoginInfo.email).toBe("francisco@attivilog.com.br");
        expect(returnedLoginInfo.username).toBe("francisco2");
    });

    test('should return "User already create" error message', async () => {
        const requestAnwser = '{ "message": "Username is already taken."}'
        requestStub.resolves(requestAnwser);

        const loginService = new LoginService(request);
        const returnedLoginInfo = await loginService.createLogin(loginUser);

        expect(returnedLoginInfo.message).toBe("Username is already taken.");
    });
});

describe('#logIn()', () => {
    test('should return login information', async () => {
        const requestAnwser = '{ ' +
            '"id": 2, ' +
            '"fullname": "usuário teste", ' +
            '"email": "francisco@attivilog.com.br", ' +
            '"username": "francisco2", ' +
            '"token": "anyjiberrish", ' +
            '"products": [], ' +
            '"tenants": [] }';
        requestStub.resolves(requestAnwser);

        const loginService = new LoginService(request);
        const returnedLoginInfo = await loginService.logIn(loginUser);

        expect(returnedLoginInfo.id).toBe(2);
        expect(returnedLoginInfo.fullname).toBe("usuário teste");
        expect(returnedLoginInfo.email).toBe("francisco@attivilog.com.br");
        expect(returnedLoginInfo.username).toBe("francisco2");
        expect(returnedLoginInfo.token).toBe('anyjiberrish');
    });

    test('should return "User already create" error message', async () => {
        const requestAnwser = {
            "code": "user or password",
            "message": "Invalid user or password"
        };
        requestStub.resolves(JSON.stringify(requestAnwser));

        const loginService = new LoginService(request);
        const returnedLoginInfo = await loginService.logIn(loginUser);

        expect(returnedLoginInfo.message).toBe("Invalid user or password");
    });
});