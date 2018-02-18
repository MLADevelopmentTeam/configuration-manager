import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientConfiguration } from './client-configuration.model';
import { ClientConfigurationPopupService } from './client-configuration-popup.service';
import { ClientConfigurationService } from './client-configuration.service';

@Component({
    selector: 'jhi-client-configuration-dialog',
    templateUrl: './client-configuration-dialog.component.html'
})
export class ClientConfigurationDialogComponent implements OnInit {

    clientConfiguration: ClientConfiguration;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private clientConfigurationService: ClientConfigurationService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clientConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientConfigurationService.update(this.clientConfiguration));
        } else {
            this.subscribeToSaveResponse(
                this.clientConfigurationService.create(this.clientConfiguration));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClientConfiguration>>) {
        result.subscribe((res: HttpResponse<ClientConfiguration>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientConfiguration) {
        this.eventManager.broadcast({ name: 'clientConfigurationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-client-configuration-popup',
    template: ''
})
export class ClientConfigurationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientConfigurationPopupService: ClientConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientConfigurationPopupService
                    .open(ClientConfigurationDialogComponent as Component, params['id']);
            } else {
                this.clientConfigurationPopupService
                    .open(ClientConfigurationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
