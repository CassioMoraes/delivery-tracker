import { Component, Input } from '@angular/core';
import { TrackingService } from './tracking.service';
import { User } from '../shared/user';
import { TrackingDocument } from '../shared/tracking-document';
import { TrackingInfo } from '../shared/tracking-info';

@Component({
    selector: 'app-tracking',
    templateUrl: './tracking.component.html',
    styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent {
    errorMessage = '';
    document: TrackingDocument;
    trackingInfo: TrackingInfo;
    @Input() user: User;

    constructor(private trackingService: TrackingService) {
        this.document = new TrackingDocument();
    }

    public searchDelivery() {
        this.errorMessage = this.validateDocument(this.document);

        if (this.errorMessage) {
            return;
        }

        this.trackingService.trackDelivery(this.user.accessToken, this.document)
            .subscribe(
                res => {
                    console.log('response', res);
                    this.trackingInfo = res;
                },
                err => {
                    this.errorMessage = err.error;
                });
    }

    validateDocument(document: TrackingDocument): string {
        if (!document.notaFiscal) {
            return 'Nota fiscal precisa estar preenchida';
        } else if (!document.documento1) {
            return 'CPF/CNPJ não informado';
        }

        return '';
    }
}
