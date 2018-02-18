import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Key } from './key.model';
import { KeyPopupService } from './key-popup.service';
import { KeyService } from './key.service';

@Component({
    selector: 'jhi-key-dialog',
    templateUrl: './key-dialog.component.html'
})
export class KeyDialogComponent implements OnInit {

    key: Key;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private keyService: KeyService,
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
        if (this.key.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keyService.update(this.key));
        } else {
            this.subscribeToSaveResponse(
                this.keyService.create(this.key));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Key>>) {
        result.subscribe((res: HttpResponse<Key>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Key) {
        this.eventManager.broadcast({ name: 'keyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-key-popup',
    template: ''
})
export class KeyPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyPopupService: KeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keyPopupService
                    .open(KeyDialogComponent as Component, params['id']);
            } else {
                this.keyPopupService
                    .open(KeyDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
