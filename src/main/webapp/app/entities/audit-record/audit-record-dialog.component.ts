import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AuditRecord } from './audit-record.model';
import { AuditRecordPopupService } from './audit-record-popup.service';
import { AuditRecordService } from './audit-record.service';

@Component({
    selector: 'jhi-audit-record-dialog',
    templateUrl: './audit-record-dialog.component.html'
})
export class AuditRecordDialogComponent implements OnInit {

    auditRecord: AuditRecord;
    isSaving: boolean;
    whenDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private auditRecordService: AuditRecordService,
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
        if (this.auditRecord.id !== undefined) {
            this.subscribeToSaveResponse(
                this.auditRecordService.update(this.auditRecord));
        } else {
            this.subscribeToSaveResponse(
                this.auditRecordService.create(this.auditRecord));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AuditRecord>>) {
        result.subscribe((res: HttpResponse<AuditRecord>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AuditRecord) {
        this.eventManager.broadcast({ name: 'auditRecordListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-audit-record-popup',
    template: ''
})
export class AuditRecordPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private auditRecordPopupService: AuditRecordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.auditRecordPopupService
                    .open(AuditRecordDialogComponent as Component, params['id']);
            } else {
                this.auditRecordPopupService
                    .open(AuditRecordDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
