import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AuditRecord } from './audit-record.model';
import { AuditRecordService } from './audit-record.service';

@Component({
    selector: 'jhi-audit-record-detail',
    templateUrl: './audit-record-detail.component.html'
})
export class AuditRecordDetailComponent implements OnInit, OnDestroy {

    auditRecord: AuditRecord;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private auditRecordService: AuditRecordService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAuditRecords();
    }

    load(id) {
        this.auditRecordService.find(id)
            .subscribe((auditRecordResponse: HttpResponse<AuditRecord>) => {
                this.auditRecord = auditRecordResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAuditRecords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'auditRecordListModification',
            (response) => this.load(this.auditRecord.id)
        );
    }
}
