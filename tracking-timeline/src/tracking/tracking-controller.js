class TrackingController {
    constructor(trackingService) {
        this.trackingService = trackingService;
    }

    async track(token, document) {
        const trackingInfo = await this.trackingService.track(token, document);

        if (trackingInfo.status === 'error')
            throw new Error(trackingInfo.message);

        return trackingInfo;
    }
}

module.exports = TrackingController;