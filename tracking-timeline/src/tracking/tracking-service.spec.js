const sinon = require('sinon');
const request = require('request-promise');
const documentValidator = require('../shared/document-validator');
const trackingMapper = require('./tracking-mapper');

const TrackingService = require('./tracking-service');

const requestStub = sinon.stub(request, 'Request');

describe('#track()', () => {
    test('should return tracking information', async () => {
        const requestAnwser = [{
            "notafiscal": 4913,
            "remetentedocumento1": "13.471.726/0001-54",
            "remetentenomeoficial": "ZUNI INDUSTRIA E COMERCIO DE PRODUTOS ALIMENTICIOS LTDA",
            "destinatariodocumento1": "04.914.102/0026-21",
            "destinatarionomeoficial": "BENJAMIN LOJA TUCURUVI",
            "dthremissao": "2019-06-03T04:34:00.000Z",
            "situacao": "ENTREGUE",
            "dthrentrega": "2019-06-03T13:07:31.000Z",
            "dthrsaida_romaneio": "2019-06-03T11:17:02.000Z",
            "dthrchegada_romaneio": null,
            "dthrsaida_manifesto": "2019-06-03T09:00:00.000Z",
            "previsao": "2019-06-04T04:34:00.000Z"
        }];
        requestStub.resolves(JSON.stringify(requestAnwser));

        const document = {
            notaFiscal: "4913",
            documento1: "04.914.102/0026-21"
        };

        const trackingService = new TrackingService(request, documentValidator, trackingMapper);
        const returnedTrackInfo = await trackingService.track('', document);

        expect(returnedTrackInfo.status).toBe("ENTREGUE");
        expect(returnedTrackInfo.sender).toBe("ZUNI INDUSTRIA E COMERCIO DE PRODUTOS ALIMENTICIOS LTDA");
    });

    test('should return empty for non-existing delivery', async () => {
        const requestAnwser = { status: 'error', message: 'There is no tracking information for this document' };
        requestStub.resolves('');

        const document = {
            notaFiscal: "4913",
            documento1: "04.914.102/0026-21"
        };

        const trackingService = new TrackingService(request, documentValidator, trackingMapper);
        const returnedTrackInfo = await trackingService.track('', document);

        expect(returnedTrackInfo.status).toBe('error');
        expect(returnedTrackInfo.message).toBe('There is no tracking information for this document');
    });

    test('should return document not valid', async () => {
        const trackingService = new TrackingService(request, documentValidator, trackingMapper);
        const returnedTrackInfo = await trackingService.track('', document);

        expect(returnedTrackInfo.status).toBe('error');
        expect(returnedTrackInfo.message).toBe('Tracking document not valid');
    });
});