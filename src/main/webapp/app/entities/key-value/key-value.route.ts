import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KeyValueComponent } from './key-value.component';
import { KeyValueDetailComponent } from './key-value-detail.component';
import { KeyValuePopupComponent } from './key-value-dialog.component';
import { KeyValueDeletePopupComponent } from './key-value-delete-dialog.component';

export const keyValueRoute: Routes = [
    {
        path: 'key-value',
        component: KeyValueComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyValues'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'key-value/:id',
        component: KeyValueDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyValues'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keyValuePopupRoute: Routes = [
    {
        path: 'key-value-new',
        component: KeyValuePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyValues'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-value/:id/edit',
        component: KeyValuePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyValues'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-value/:id/delete',
        component: KeyValueDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyValues'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
