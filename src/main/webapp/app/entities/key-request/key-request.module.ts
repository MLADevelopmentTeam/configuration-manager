import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../../shared';
import {
    KeyRequestService,
    KeyRequestPopupService,
    KeyRequestComponent,
    KeyRequestDetailComponent,
    KeyRequestDialogComponent,
    KeyRequestPopupComponent,
    KeyRequestDeletePopupComponent,
    KeyRequestDeleteDialogComponent,
    keyRequestRoute,
    keyRequestPopupRoute,
} from './';

const ENTITY_STATES = [
    ...keyRequestRoute,
    ...keyRequestPopupRoute,
];

@NgModule({
    imports: [
        ConfigurationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeyRequestComponent,
        KeyRequestDetailComponent,
        KeyRequestDialogComponent,
        KeyRequestDeleteDialogComponent,
        KeyRequestPopupComponent,
        KeyRequestDeletePopupComponent,
    ],
    entryComponents: [
        KeyRequestComponent,
        KeyRequestDialogComponent,
        KeyRequestPopupComponent,
        KeyRequestDeleteDialogComponent,
        KeyRequestDeletePopupComponent,
    ],
    providers: [
        KeyRequestService,
        KeyRequestPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationKeyRequestModule {}
