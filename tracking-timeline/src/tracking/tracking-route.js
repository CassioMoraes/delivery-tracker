const express = require('express');
const router = express.Router();
const request = require('request-promise');

const trackingMapper = require('./tracking-mapper');
const documentValidator = require('../shared/document-validator');
const TrackingService = require('./tracking-service');
const TrackingController = require('./tracking-controller');

const trackingService = new TrackingService(request, documentValidator, trackingMapper);
const trackingController = new TrackingController(trackingService);

router.post('/', (req, res, next) => {
    const token = req.body.token;
    const trackInfo = JSON.parse(req.body.trackInfo);

    trackingController.track(token, trackInfo).then((trackResult) => {
        res.status(201);
        res.json(trackResult);
    }, (reason) => {
        res.status(400);
        res.json(reason.message);
    });
});

module.exports = router;