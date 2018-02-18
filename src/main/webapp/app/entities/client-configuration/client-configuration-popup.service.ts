import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ClientConfiguration } from './client-configuration.model';
import { ClientConfigurationService } from './client-configuration.service';

@Injectable()
export class ClientConfigurationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clientConfigurationService: ClientConfigurationService

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
                this.clientConfigurationService.find(id)
                    .subscribe((clientConfigurationResponse: HttpResponse<ClientConfiguration>) => {
                        const clientConfiguration: ClientConfiguration = clientConfigurationResponse.body;
                        this.ngbModalRef = this.clientConfigurationModalRef(component, clientConfiguration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clientConfigurationModalRef(component, new ClientConfiguration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clientConfigurationModalRef(component: Component, clientConfiguration: ClientConfiguration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clientConfiguration = clientConfiguration;
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
