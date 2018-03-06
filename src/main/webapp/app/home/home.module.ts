import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfigurationSharedModule } from '../shared';
import { ConfigurationEntityModule } from '../entities/entity.module';

import { HOME_ROUTE, HomeComponent } from './';

@NgModule({
    imports: [
        ConfigurationEntityModule,
        ConfigurationSharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationHomeModule {}
