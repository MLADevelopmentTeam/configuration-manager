import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionService } from './version.service';

@Component({
    selector: 'jhi-version-detail',
    templateUrl: './version-detail.component.html'
})
export class VersionDetailComponent implements OnInit, OnDestroy {

    version: Version;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private versionService: VersionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVersions();
    }

    load(id) {
        this.versionService.find(id)
            .subscribe((versionResponse: HttpResponse<Version>) => {
                this.version = versionResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVersions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'versionListModification',
            (response) => this.load(this.version.id)
        );
    }
}
