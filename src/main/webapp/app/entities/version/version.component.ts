import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Version } from './version.model';
import { VersionService } from './version.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-version',
    templateUrl: './version.component.html'
})
export class VersionComponent implements OnInit, OnDestroy {
versions: Version[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private versionService: VersionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.versionService.query().subscribe(
            (res: HttpResponse<Version[]>) => {
                this.versions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVersions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Version) {
        return item.id;
    }
    registerChangeInVersions() {
        this.eventSubscriber = this.eventManager.subscribe('versionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
