import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../../shared';
import {
    KeyValueService,
    KeyValuePopupService,
    KeyValueComponent,
    KeyValueDetailComponent,
    KeyValueDialogComponent,
    KeyValuePopupComponent,
    KeyValueDeletePopupComponent,
    KeyValueDeleteDialogComponent,
    keyValueRoute,
    keyValuePopupRoute,
} from './';

const ENTITY_STATES = [
    ...keyValueRoute,
    ...keyValuePopupRoute,
];

@NgModule({
    imports: [
        ConfigurationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        KeyValueComponent,
        KeyValueDetailComponent,
        KeyValueDialogComponent,
        KeyValueDeleteDialogComponent,
        KeyValuePopupComponent,
        KeyValueDeletePopupComponent,
    ],
    entryComponents: [
        KeyValueComponent,
        KeyValueDialogComponent,
        KeyValuePopupComponent,
        KeyValueDeleteDialogComponent,
        KeyValueDeletePopupComponent,
    ],
    providers: [
        KeyValueService,
        KeyValuePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationKeyValueModule {}
