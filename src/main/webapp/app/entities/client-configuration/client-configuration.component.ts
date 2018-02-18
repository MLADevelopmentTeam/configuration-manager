import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientConfiguration } from './client-configuration.model';
import { ClientConfigurationService } from './client-configuration.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-client-configuration',
    templateUrl: './client-configuration.component.html'
})
export class ClientConfigurationComponent implements OnInit, OnDestroy {
clientConfigurations: ClientConfiguration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private clientConfigurationService: ClientConfigurationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.clientConfigurationService.query().subscribe(
            (res: HttpResponse<ClientConfiguration[]>) => {
                this.clientConfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInClientConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ClientConfiguration) {
        return item.id;
    }
    registerChangeInClientConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('clientConfigurationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
