import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrackingInfo } from '../shared/tracking-info';

@Injectable({
    providedIn: 'root',
})

export class TrackingService {

    private serviceURL = 'http://localhost:3030/tracking';

    constructor(private http: HttpClient) { }

    public trackDelivery(token: string, document: any) {
        const payload = { token, trackInfo: JSON.stringify(document) };
        return this.http.post<TrackingInfo>(this.serviceURL, payload);
    }
}
