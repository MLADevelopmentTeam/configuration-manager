import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { KeyRequest } from './key-request.model';
import { KeyRequestService } from './key-request.service';

@Component({
    selector: 'jhi-key-request-detail',
    templateUrl: './key-request-detail.component.html'
})
export class KeyRequestDetailComponent implements OnInit, OnDestroy {

    keyRequest: KeyRequest;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keyRequestService: KeyRequestService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeyRequests();
    }

    load(id) {
        this.keyRequestService.find(id)
            .subscribe((keyRequestResponse: HttpResponse<KeyRequest>) => {
                this.keyRequest = keyRequestResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeyRequests() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keyRequestListModification',
            (response) => this.load(this.keyRequest.id)
        );
    }
}
