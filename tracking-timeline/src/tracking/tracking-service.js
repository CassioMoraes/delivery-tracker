class TrackingService {

    constructor(request, documentValidator, trackingMapper) {
        this.request = request;
        this.documentValidator = documentValidator;
        this.trackingMapper = trackingMapper;
        this.baseServiceURL = 'http://servicos.attivilog.com.br:3009';
    }

    async track(token, trackInfo) {
        var validationResult = this.documentValidator.validate(trackInfo.documento1);

        if (validationResult.isValid === false)
            return { status: 'error', message: 'Tracking document not valid' };
        else
            trackInfo.documento1 = validationResult.document;

        const options = {
            method: 'POST',
            uri: this.baseServiceURL + '/search-delivery',
            body: JSON.stringify(trackInfo),
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        };

        return this.request(options)
            .then((response) => {
                if (response.length === 0)
                    return { status: 'error', message: 'There is no tracking information for this document' };

                const jsonResponse = JSON.parse(response);
                return this.trackingMapper.map(jsonResponse);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = TrackingService;