import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../../shared';
import {
    ClientConfigurationService,
    ClientConfigurationPopupService,
    ClientConfigurationComponent,
    ClientConfigurationDetailComponent,
    ClientConfigurationDialogComponent,
    ClientConfigurationPopupComponent,
    ClientConfigurationDeletePopupComponent,
    ClientConfigurationDeleteDialogComponent,
    clientConfigurationRoute,
    clientConfigurationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clientConfigurationRoute,
    ...clientConfigurationPopupRoute,
];

@NgModule({
    imports: [
        ConfigurationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientConfigurationComponent,
        ClientConfigurationDetailComponent,
        ClientConfigurationDialogComponent,
        ClientConfigurationDeleteDialogComponent,
        ClientConfigurationPopupComponent,
        ClientConfigurationDeletePopupComponent,
    ],
    entryComponents: [
        ClientConfigurationComponent,
        ClientConfigurationDialogComponent,
        ClientConfigurationPopupComponent,
        ClientConfigurationDeleteDialogComponent,
        ClientConfigurationDeletePopupComponent,
    ],
    providers: [
        ClientConfigurationService,
        ClientConfigurationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationClientConfigurationModule {}
