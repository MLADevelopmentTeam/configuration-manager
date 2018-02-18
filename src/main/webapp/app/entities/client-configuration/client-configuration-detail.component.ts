import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClientConfiguration } from './client-configuration.model';
import { ClientConfigurationService } from './client-configuration.service';

@Component({
    selector: 'jhi-client-configuration-detail',
    templateUrl: './client-configuration-detail.component.html'
})
export class ClientConfigurationDetailComponent implements OnInit, OnDestroy {

    clientConfiguration: ClientConfiguration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientConfigurationService: ClientConfigurationService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientConfigurations();
    }

    load(id) {
        this.clientConfigurationService.find(id)
            .subscribe((clientConfigurationResponse: HttpResponse<ClientConfiguration>) => {
                this.clientConfiguration = clientConfigurationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientConfigurationListModification',
            (response) => this.load(this.clientConfiguration.id)
        );
    }
}
