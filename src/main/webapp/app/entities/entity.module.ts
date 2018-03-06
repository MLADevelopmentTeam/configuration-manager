import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ConfigurationClientModule } from './client/client.module';
import { ConfigurationRoleModule } from './role/role.module';
import { ConfigurationVersionModule } from './version/version.module';
import { ConfigurationLabelModule } from './label/label.module';
import { ConfigurationClientConfigurationModule } from './client-configuration/client-configuration.module';
import { ConfigurationKeyRequestModule } from './key-request/key-request.module';
import { ConfigurationAuditRecordModule } from './audit-record/audit-record.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ConfigurationClientModule,
        ConfigurationRoleModule,
        ConfigurationVersionModule,
        ConfigurationLabelModule,
        ConfigurationClientConfigurationModule,
        ConfigurationKeyRequestModule,
        ConfigurationAuditRecordModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    exports: [
        ConfigurationKeyRequestModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationEntityModule {}
