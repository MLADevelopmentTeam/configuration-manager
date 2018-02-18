import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { KeyValue } from './key-value.model';
import { KeyValueService } from './key-value.service';

@Component({
    selector: 'jhi-key-value-detail',
    templateUrl: './key-value-detail.component.html'
})
export class KeyValueDetailComponent implements OnInit, OnDestroy {

    keyValue: KeyValue;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keyValueService: KeyValueService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeyValues();
    }

    load(id) {
        this.keyValueService.find(id)
            .subscribe((keyValueResponse: HttpResponse<KeyValue>) => {
                this.keyValue = keyValueResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeyValues() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keyValueListModification',
            (response) => this.load(this.keyValue.id)
        );
    }
}
