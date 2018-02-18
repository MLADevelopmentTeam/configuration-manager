import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SectionComponent } from './section.component';
import { SectionDetailComponent } from './section-detail.component';
import { SectionPopupComponent } from './section-dialog.component';
import { SectionDeletePopupComponent } from './section-delete-dialog.component';

export const sectionRoute: Routes = [
    {
        path: 'section',
        component: SectionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'section/:id',
        component: SectionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sectionPopupRoute: Routes = [
    {
        path: 'section-new',
        component: SectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'section/:id/edit',
        component: SectionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'section/:id/delete',
        component: SectionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Sections'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
