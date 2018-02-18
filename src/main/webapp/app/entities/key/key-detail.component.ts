import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Key } from './key.model';
import { KeyService } from './key.service';

@Component({
    selector: 'jhi-key-detail',
    templateUrl: './key-detail.component.html'
})
export class KeyDetailComponent implements OnInit, OnDestroy {

    key: Key;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keyService: KeyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeys();
    }

    load(id) {
        this.keyService.find(id)
            .subscribe((keyResponse: HttpResponse<Key>) => {
                this.key = keyResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeys() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keyListModification',
            (response) => this.load(this.key.id)
        );
    }
}
