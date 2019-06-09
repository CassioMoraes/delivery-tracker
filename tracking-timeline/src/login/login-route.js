const express = require('express');
const router = express.Router();

const request = require('request-promise');

const LoginUser = require('./login-user');
const LoginService = require('./login-service');
const LoginController = require('./login-controller');

const loginService = new LoginService(request);
const loginController = new LoginController(loginService);

router.post('/create', (req, res, next) => {
    const email = req.body.email;
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;

    const loginUser = new LoginUser(email, fullname, username, password);

    loginController.create(loginUser)
    .then((login) => {
        res.status(201);
        res.json(login);
    }).catch((reason) => {
        res.status(400);
        res.json(reason.message);
    });
});

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    const loginUser = new LoginUser('', '', username, password);

    loginController.logIn(loginUser).then((login) => {
        res.status(201);
        res.json(login);
    }, (reason) => {
        res.status(400);
        res.json(reason.message);
    });
});

module.exports = router;