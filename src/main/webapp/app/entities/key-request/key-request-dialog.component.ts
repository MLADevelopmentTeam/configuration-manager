import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeyRequest } from './key-request.model';
import { KeyRequestPopupService } from './key-request-popup.service';
import { KeyRequestService } from './key-request.service';

@Component({
    selector: 'jhi-key-request-dialog',
    templateUrl: './key-request-dialog.component.html'
})
export class KeyRequestDialogComponent implements OnInit {

    keyRequest: KeyRequest;
    isSaving: boolean;
    closedDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private keyRequestService: KeyRequestService,
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
        if (this.keyRequest.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keyRequestService.update(this.keyRequest));
        } else {
            this.subscribeToSaveResponse(
                this.keyRequestService.create(this.keyRequest));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KeyRequest>>) {
        result.subscribe((res: HttpResponse<KeyRequest>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KeyRequest) {
        this.eventManager.broadcast({ name: 'keyRequestListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-key-request-popup',
    template: ''
})
export class KeyRequestPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyRequestPopupService: KeyRequestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keyRequestPopupService
                    .open(KeyRequestDialogComponent as Component, params['id']);
            } else {
                this.keyRequestPopupService
                    .open(KeyRequestDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
