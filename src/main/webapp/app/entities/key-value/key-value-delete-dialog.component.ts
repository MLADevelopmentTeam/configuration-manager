import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeyValue } from './key-value.model';
import { KeyValuePopupService } from './key-value-popup.service';
import { KeyValueService } from './key-value.service';

@Component({
    selector: 'jhi-key-value-delete-dialog',
    templateUrl: './key-value-delete-dialog.component.html'
})
export class KeyValueDeleteDialogComponent {

    keyValue: KeyValue;

    constructor(
        private keyValueService: KeyValueService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.keyValueService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keyValueListModification',
                content: 'Deleted an keyValue'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-key-value-delete-popup',
    template: ''
})
export class KeyValueDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keyValuePopupService: KeyValuePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keyValuePopupService
                .open(KeyValueDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
