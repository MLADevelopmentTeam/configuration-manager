import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { KeyValue } from './key-value.model';
import { KeyValueService } from './key-value.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-key-value',
    templateUrl: './key-value.component.html'
})
export class KeyValueComponent implements OnInit, OnDestroy {
keyValues: KeyValue[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keyValueService: KeyValueService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.keyValueService.query().subscribe(
            (res: HttpResponse<KeyValue[]>) => {
                this.keyValues = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKeyValues();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: KeyValue) {
        return item.id;
    }
    registerChangeInKeyValues() {
        this.eventSubscriber = this.eventManager.subscribe('keyValueListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
