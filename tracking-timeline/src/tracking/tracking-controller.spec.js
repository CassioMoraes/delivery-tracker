const sinon = require('sinon');

const TrackingService = require('./tracking-service');
const TrackingController = require('./tracking-controller');

const trackingService = new TrackingService(null, null, null);

const trackStub = sinon.stub(trackingService, 'track');

describe('#track()', () => {
    test('should return tracking information', async () => {
        const requestAnwser = {
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
        };
        trackStub.resolves(requestAnwser);

        const document = {
            notaFiscal: "4913",
            documento1: "04.914.102/0026-21"
        };

        const trackingController = new TrackingController(trackingService);
        const returnedTrackInfo = await trackingController.track('', document);

        expect(returnedTrackInfo.notafiscal).toBe(4913);
        expect(returnedTrackInfo.destinatariodocumento1).toBe('04.914.102/0026-21');
    });

    test('should throw error message', async () => {
        const requestAnwser = { status: 'error', message: 'There is no tracking information for this document.' }
        trackStub.resolves(requestAnwser);

        const trackingController = new TrackingController(trackingService);
        const document = {
            notaFiscal: "4913",
            documento1: "04.914.102/0026-21"
        };

        try {
            await trackingController.track('', document);
        } catch (err) {
            expect(err.message).toBe('There is no tracking information for this document.')
        }
    });
});