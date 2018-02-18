import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeyRequest } from './key-request.model';
import { KeyRequestPopupService } from './key-request-popup.service';
import { KeyRequestService } from './key-request.service';

@Component({
    selector: 'jhi-key-request-delete-dialog',
    templateUrl: './key-request-delete-dialog.component.html'
})
export class KeyRequestDeleteDialogComponent {

    keyRequest: KeyRequest;

    constructor(
        private keyRequestService: KeyRequestService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.keyRequestService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keyRequestListModification',
                content: 'Deleted an keyRequest'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-key-request-delete-popup',
    template: ''
})
export class KeyRequestDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyRequestPopupService: KeyRequestPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keyRequestPopupService
                .open(KeyRequestDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
