import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientConfiguration } from './client-configuration.model';
import { ClientConfigurationPopupService } from './client-configuration-popup.service';
import { ClientConfigurationService } from './client-configuration.service';

@Component({
    selector: 'jhi-client-configuration-delete-dialog',
    templateUrl: './client-configuration-delete-dialog.component.html'
})
export class ClientConfigurationDeleteDialogComponent {

    clientConfiguration: ClientConfiguration;

    constructor(
        private clientConfigurationService: ClientConfigurationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.clientConfigurationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientConfigurationListModification',
                content: 'Deleted an clientConfiguration'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-configuration-delete-popup',
    template: ''
})
export class ClientConfigurationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientConfigurationPopupService: ClientConfigurationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientConfigurationPopupService
                .open(ClientConfigurationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
