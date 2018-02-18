import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { KeyRequest } from './key-request.model';
import { KeyRequestService } from './key-request.service';

@Injectable()
export class KeyRequestPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private keyRequestService: KeyRequestService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.keyRequestService.find(id)
                    .subscribe((keyRequestResponse: HttpResponse<KeyRequest>) => {
                        const keyRequest: KeyRequest = keyRequestResponse.body;
                        if (keyRequest.closedDate) {
                            keyRequest.closedDate = {
                                year: keyRequest.closedDate.getFullYear(),
                                month: keyRequest.closedDate.getMonth() + 1,
                                day: keyRequest.closedDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.keyRequestModalRef(component, keyRequest);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.keyRequestModalRef(component, new KeyRequest());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    keyRequestModalRef(component: Component, keyRequest: KeyRequest): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.keyRequest = keyRequest;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
