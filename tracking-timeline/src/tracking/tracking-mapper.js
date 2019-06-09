const TrackingInfo = require('../shared/tracking-info');
const TrackingStepInfo = require('../shared/tracking-step-info');
const _ = require('lodash');

class TrackingMapper {

    static map(trackingPayload) {
        // Recebido pela transportadora: deve ser preenchido com o campo: dthremissao
        // Em viagem: deve ser preenchido com o campo: dthrsaida_manifesto
        // Saída para Entrega: deve ser preenchido com o campo: dthrsaida_romaneio
        // Entregue: deve ser preenchido com o campo: dthrentrega

        const trackingSteps = [];

        _.forEach((trackingPayload), tracking => {
            if (tracking.dthremissao) {
                trackingSteps.push(new TrackingStepInfo('carrier', tracking.dthremissao));
            }

            if (tracking.dthrsaida_manifesto) {
                trackingSteps.push(new TrackingStepInfo('traveling', tracking.dthrsaida_manifesto));
            }

            if (tracking.dthrsaida_romaneio) {
                trackingSteps.push(new TrackingStepInfo('delivery', tracking.dthrsaida_romaneio));
            }

            if (tracking.dthrentrega) {
                trackingSteps.push(new TrackingStepInfo('delivered', tracking.dthrentrega));
            }
        })

        const sortedSteps = _.orderBy(trackingSteps, (step) => {
            return new Date(step.date);
        }).reverse();

        const trackingInfo = new TrackingInfo(
            trackingPayload[0].situacao,
            trackingPayload[0].remetentenomeoficial,
            trackingPayload[0].destinatarionomeoficial,
            sortedSteps
        );

        return trackingInfo;
    }
}

module.exports = TrackingMapper;