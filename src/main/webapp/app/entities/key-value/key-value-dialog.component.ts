import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeyValue } from './key-value.model';
import { KeyValuePopupService } from './key-value-popup.service';
import { KeyValueService } from './key-value.service';

@Component({
    selector: 'jhi-key-value-dialog',
    templateUrl: './key-value-dialog.component.html'
})
export class KeyValueDialogComponent implements OnInit {

    keyValue: KeyValue;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private keyValueService: KeyValueService,
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
        if (this.keyValue.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keyValueService.update(this.keyValue));
        } else {
            this.subscribeToSaveResponse(
                this.keyValueService.create(this.keyValue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KeyValue>>) {
        result.subscribe((res: HttpResponse<KeyValue>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KeyValue) {
        this.eventManager.broadcast({ name: 'keyValueListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-key-value-popup',
    template: ''
})
export class KeyValuePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyValuePopupService: KeyValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keyValuePopupService
                    .open(KeyValueDialogComponent as Component, params['id']);
            } else {
                this.keyValuePopupService
                    .open(KeyValueDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
