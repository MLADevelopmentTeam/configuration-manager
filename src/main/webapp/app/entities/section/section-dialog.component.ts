import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Section } from './section.model';
import { SectionPopupService } from './section-popup.service';
import { SectionService } from './section.service';

@Component({
    selector: 'jhi-section-dialog',
    templateUrl: './section-dialog.component.html'
})
export class SectionDialogComponent implements OnInit {

    section: Section;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private sectionService: SectionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.section.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sectionService.update(this.section));
        } else {
            this.subscribeToSaveResponse(
                this.sectionService.create(this.section));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Section>>) {
        result.subscribe((res: HttpResponse<Section>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Section) {
        this.eventManager.broadcast({ name: 'sectionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-section-popup',
    template: ''
})
export class SectionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sectionPopupService: SectionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sectionPopupService
                    .open(SectionDialogComponent as Component, params['id']);
            } else {
                this.sectionPopupService
                    .open(SectionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
