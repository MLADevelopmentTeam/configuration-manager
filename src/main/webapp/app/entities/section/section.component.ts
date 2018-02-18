import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Section } from './section.model';
import { SectionService } from './section.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-section',
    templateUrl: './section.component.html'
})
export class SectionComponent implements OnInit, OnDestroy {
sections: Section[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private sectionService: SectionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.sectionService.query().subscribe(
            (res: HttpResponse<Section[]>) => {
                this.sections = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSections();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Section) {
        return item.id;
    }
    registerChangeInSections() {
        this.eventSubscriber = this.eventManager.subscribe('sectionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
