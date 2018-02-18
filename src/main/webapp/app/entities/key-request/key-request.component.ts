import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { KeyRequest } from './key-request.model';
import { KeyRequestService } from './key-request.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-key-request',
    templateUrl: './key-request.component.html'
})
export class KeyRequestComponent implements OnInit, OnDestroy {
keyRequests: KeyRequest[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keyRequestService: KeyRequestService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.keyRequestService.query().subscribe(
            (res: HttpResponse<KeyRequest[]>) => {
                this.keyRequests = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKeyRequests();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: KeyRequest) {
        return item.id;
    }
    registerChangeInKeyRequests() {
        this.eventSubscriber = this.eventManager.subscribe('keyRequestListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
