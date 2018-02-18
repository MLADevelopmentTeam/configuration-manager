/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { ClientConfigurationDetailComponent } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration-detail.component';
import { ClientConfigurationService } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration.service';
import { ClientConfiguration } from '../../../../../../main/webapp/app/entities/client-configuration/client-configuration.model';

describe('Component Tests', () => {

    describe('ClientConfiguration Management Detail Component', () => {
        let comp: ClientConfigurationDetailComponent;
        let fixture: ComponentFixture<ClientConfigurationDetailComponent>;
        let service: ClientConfigurationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [ClientConfigurationDetailComponent],
                providers: [
                    ClientConfigurationService
                ]
            })
            .overrideTemplate(ClientConfigurationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ClientConfigurationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ClientConfigurationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ClientConfiguration('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.clientConfiguration).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
