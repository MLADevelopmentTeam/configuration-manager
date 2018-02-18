import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AuditRecord } from './audit-record.model';
import { AuditRecordService } from './audit-record.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-audit-record',
    templateUrl: './audit-record.component.html'
})
export class AuditRecordComponent implements OnInit, OnDestroy {
auditRecords: AuditRecord[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private auditRecordService: AuditRecordService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.auditRecordService.query().subscribe(
            (res: HttpResponse<AuditRecord[]>) => {
                this.auditRecords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAuditRecords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AuditRecord) {
        return item.id;
    }
    registerChangeInAuditRecords() {
        this.eventSubscriber = this.eventManager.subscribe('auditRecordListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
