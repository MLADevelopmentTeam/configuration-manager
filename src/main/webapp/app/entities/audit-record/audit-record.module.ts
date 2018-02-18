import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../../shared';
import {
    AuditRecordService,
    AuditRecordPopupService,
    AuditRecordComponent,
    AuditRecordDetailComponent,
    AuditRecordDialogComponent,
    AuditRecordPopupComponent,
    AuditRecordDeletePopupComponent,
    AuditRecordDeleteDialogComponent,
    auditRecordRoute,
    auditRecordPopupRoute,
} from './';

const ENTITY_STATES = [
    ...auditRecordRoute,
    ...auditRecordPopupRoute,
];

@NgModule({
    imports: [
        ConfigurationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AuditRecordComponent,
        AuditRecordDetailComponent,
        AuditRecordDialogComponent,
        AuditRecordDeleteDialogComponent,
        AuditRecordPopupComponent,
        AuditRecordDeletePopupComponent,
    ],
    entryComponents: [
        AuditRecordComponent,
        AuditRecordDialogComponent,
        AuditRecordPopupComponent,
        AuditRecordDeleteDialogComponent,
        AuditRecordDeletePopupComponent,
    ],
    providers: [
        AuditRecordService,
        AuditRecordPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationAuditRecordModule {}
