import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../../shared';
import {
    KeyService,
    KeyPopupService,
    KeyComponent,
    KeyDetailComponent,
    KeyDialogComponent,
    KeyPopupComponent,
    KeyDeletePopupComponent,
    KeyDeleteDialogComponent,
    keyRoute,
    keyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...keyRoute,
    ...keyPopupRoute,
];

@NgModule({
    imports: [
        ConfigurationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeyComponent,
        KeyDetailComponent,
        KeyDialogComponent,
        KeyDeleteDialogComponent,
        KeyPopupComponent,
        KeyDeletePopupComponent,
    ],
    entryComponents: [
        KeyComponent,
        KeyDialogComponent,
        KeyPopupComponent,
        KeyDeleteDialogComponent,
        KeyDeletePopupComponent,
    ],
    providers: [
        KeyService,
        KeyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationKeyModule {}
