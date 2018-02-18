import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Key } from './key.model';
import { KeyPopupService } from './key-popup.service';
import { KeyService } from './key.service';

@Component({
    selector: 'jhi-key-delete-dialog',
    templateUrl: './key-delete-dialog.component.html'
})
export class KeyDeleteDialogComponent {

    key: Key;

    constructor(
        private keyService: KeyService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.keyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keyListModification',
                content: 'Deleted an key'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-key-delete-popup',
    template: ''
})
export class KeyDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyPopupService: KeyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keyPopupService
                .open(KeyDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
