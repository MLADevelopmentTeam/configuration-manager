import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AuditRecord } from './audit-record.model';
import { AuditRecordService } from './audit-record.service';

@Injectable()
export class AuditRecordPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private auditRecordService: AuditRecordService

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
                this.auditRecordService.find(id)
                    .subscribe((auditRecordResponse: HttpResponse<AuditRecord>) => {
                        const auditRecord: AuditRecord = auditRecordResponse.body;
                        if (auditRecord.when) {
                            auditRecord.when = {
                                year: auditRecord.when.getFullYear(),
                                month: auditRecord.when.getMonth() + 1,
                                day: auditRecord.when.getDate()
                            };
                        }
                        this.ngbModalRef = this.auditRecordModalRef(component, auditRecord);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.auditRecordModalRef(component, new AuditRecord());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    auditRecordModalRef(component: Component, auditRecord: AuditRecord): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.auditRecord = auditRecord;
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
