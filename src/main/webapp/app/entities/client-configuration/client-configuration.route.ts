import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClientConfigurationComponent } from './client-configuration.component';
import { ClientConfigurationDetailComponent } from './client-configuration-detail.component';
import { ClientConfigurationPopupComponent } from './client-configuration-dialog.component';
import { ClientConfigurationDeletePopupComponent } from './client-configuration-delete-dialog.component';

export const clientConfigurationRoute: Routes = [
    {
        path: 'client-configuration',
        component: ClientConfigurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientConfigurations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-configuration/:id',
        component: ClientConfigurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientConfigurations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientConfigurationPopupRoute: Routes = [
    {
        path: 'client-configuration-new',
        component: ClientConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientConfigurations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-configuration/:id/edit',
        component: ClientConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientConfigurations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-configuration/:id/delete',
        component: ClientConfigurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ClientConfigurations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
