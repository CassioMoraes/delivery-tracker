class LoginService {

    constructor(request) {
        this.request = request;
        this.baseServiceURL = 'http://servicos.attivilog.com.br:3005';
    }

    async createLogin(loginUser) {
        const options = {
            method: 'POST',
            uri: this.baseServiceURL + '/users/create',
            body: JSON.stringify(loginUser),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return this.request(options)
            .then((response) => {
                return JSON.parse(response);
            })
            .catch((err) => {
                console.log('ERR', err);
            });
    }


    async logIn(loginUser) {
        const options = {
            method: 'POST',
            uri: this.baseServiceURL + '/login',
            body: JSON.stringify(loginUser),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        return this.request(options)
            .then((response) => {
                let returnedResponse = null;
                try {
                    returnedResponse = JSON.parse(response);
                } catch{
                    returnedResponse = { message: response };
                }
                return returnedResponse;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = LoginService;