import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { KeyRequestComponent } from './key-request.component';
import { KeyRequestDetailComponent } from './key-request-detail.component';
import { KeyRequestPopupComponent } from './key-request-dialog.component';
import { KeyRequestDeletePopupComponent } from './key-request-delete-dialog.component';

export const keyRequestRoute: Routes = [
    {
        path: 'key-request',
        component: KeyRequestComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyRequests'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'key-request/:id',
        component: KeyRequestDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyRequests'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const keyRequestPopupRoute: Routes = [
    {
        path: 'key-request-new',
        component: KeyRequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyRequests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-request/:id/edit',
        component: KeyRequestPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyRequests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'key-request/:id/delete',
        component: KeyRequestDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'KeyRequests'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
