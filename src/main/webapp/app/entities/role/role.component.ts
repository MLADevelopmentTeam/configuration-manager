import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Role } from './role.model';
import { RoleService } from './role.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-role',
    templateUrl: './role.component.html'
})
export class RoleComponent implements OnInit, OnDestroy {
roles: Role[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private roleService: RoleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.roleService.query().subscribe(
            (res: HttpResponse<Role[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Role) {
        return item.id;
    }
    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe('roleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
