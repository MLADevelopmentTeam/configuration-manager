/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyRequestDetailComponent } from '../../../../../../main/webapp/app/entities/key-request/key-request-detail.component';
import { KeyRequestService } from '../../../../../../main/webapp/app/entities/key-request/key-request.service';
import { KeyRequest } from '../../../../../../main/webapp/app/entities/key-request/key-request.model';

describe('Component Tests', () => {

    describe('KeyRequest Management Detail Component', () => {
        let comp: KeyRequestDetailComponent;
        let fixture: ComponentFixture<KeyRequestDetailComponent>;
        let service: KeyRequestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyRequestDetailComponent],
                providers: [
                    KeyRequestService
                ]
            })
            .overrideTemplate(KeyRequestDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyRequestDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyRequestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new KeyRequest('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.keyRequest).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
