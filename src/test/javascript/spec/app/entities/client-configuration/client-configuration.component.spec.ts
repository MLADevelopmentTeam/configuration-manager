/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { ClientConfigurationComponent } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration.component';
import { ClientConfigurationService } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration.service';
import { ClientConfiguration } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration.model';

describe('Component Tests', () => {

    describe('ClientConfiguration Management Component', () => {
        let comp: ClientConfigurationComponent;
        let fixture: ComponentFixture<ClientConfigurationComponent>;
        let service: ClientConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [ClientConfigurationComponent],
                providers: [
                    ClientConfigurationService
                ]
            })
            .overrideTemplate(ClientConfigurationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ClientConfiguration('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.clientConfigurations[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
