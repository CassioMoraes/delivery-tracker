const TrackingMapper = require('./tracking-mapper');

describe('#validate()', () => {
    test('should return mapped tracking information', async () => {
        const samplePayload = [{
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
        }]

        const mappedPayload = TrackingMapper.map(samplePayload);

        expect(mappedPayload.status).toBe('ENTREGUE');
        expect(mappedPayload.steps.length).toBe(4);
    });

    test('should return mapped tracking information', async () => {
        const samplePayload = [{
            "notafiscal": 23825,
            "remetentedocumento1": "88.628.243/0001-10",
            "remetentenomeoficial": "Tome S/A Ind de Auto Pecas - Matriz",
            "destinatariodocumento1": "66.617.747/0001-00",
            "destinatarionomeoficial": "BECAP COMÉRCIO DE AUTO PEÇAS LTDA - 42",
            "dthremissao": "2019-06-05T20:27:00.000Z",
            "situacao": "AGUARDANDO_ENTREGA",
            "dthrentrega": null,
            "dthrsaida_romaneio": null,
            "dthrchegada_romaneio": null,
            "dthrsaida_manifesto": "2019-06-08T12:00:00.000Z",
            "previsao": "2019-06-06T20:27:00.000Z"
        }]

        const mappedPayload = TrackingMapper.map(samplePayload);

        expect(mappedPayload.status).toBe('AGUARDANDO_ENTREGA');
        expect(mappedPayload.steps.length).toBe(2);
    });
});