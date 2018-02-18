import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AuditRecordComponent } from './audit-record.component';
import { AuditRecordDetailComponent } from './audit-record-detail.component';
import { AuditRecordPopupComponent } from './audit-record-dialog.component';
import { AuditRecordDeletePopupComponent } from './audit-record-delete-dialog.component';

export const auditRecordRoute: Routes = [
    {
        path: 'audit-record',
        component: AuditRecordComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuditRecords'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'audit-record/:id',
        component: AuditRecordDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuditRecords'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const auditRecordPopupRoute: Routes = [
    {
        path: 'audit-record-new',
        component: AuditRecordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuditRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'audit-record/:id/edit',
        component: AuditRecordPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuditRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'audit-record/:id/delete',
        component: AuditRecordDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AuditRecords'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
