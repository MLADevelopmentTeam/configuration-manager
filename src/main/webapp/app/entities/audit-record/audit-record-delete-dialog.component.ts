import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AuditRecord } from './audit-record.model';
import { AuditRecordPopupService } from './audit-record-popup.service';
import { AuditRecordService } from './audit-record.service';

@Component({
    selector: 'jhi-audit-record-delete-dialog',
    templateUrl: './audit-record-delete-dialog.component.html'
})
export class AuditRecordDeleteDialogComponent {

    auditRecord: AuditRecord;

    constructor(
        private auditRecordService: AuditRecordService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.auditRecordService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'auditRecordListModification',
                content: 'Deleted an auditRecord'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-audit-record-delete-popup',
    template: ''
})
export class AuditRecordDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private auditRecordPopupService: AuditRecordPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.auditRecordPopupService
                .open(AuditRecordDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
