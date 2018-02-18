import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Section } from './section.model';
import { SectionPopupService } from './section-popup.service';
import { SectionService } from './section.service';

@Component({
    selector: 'jhi-section-delete-dialog',
    templateUrl: './section-delete-dialog.component.html'
})
export class SectionDeleteDialogComponent {

    section: Section;

    constructor(
        private sectionService: SectionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: string) {
        this.sectionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sectionListModification',
                content: 'Deleted an section'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-section-delete-popup',
    template: ''
})
export class SectionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectionPopupService: SectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sectionPopupService
                .open(SectionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
