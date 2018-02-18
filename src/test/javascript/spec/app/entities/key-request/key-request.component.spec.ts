/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyRequestComponent } from '../../../../../../main/webapp/app/entities/key-request/key-request.component';
import { KeyRequestService } from '../../../../../../main/webapp/app/entities/key-request/key-request.service';
import { KeyRequest } from '../../../../../../main/webapp/app/entities/key-request/key-request.model';

describe('Component Tests', () => {

    describe('KeyRequest Management Component', () => {
        let comp: KeyRequestComponent;
        let fixture: ComponentFixture<KeyRequestComponent>;
        let service: KeyRequestService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyRequestComponent],
                providers: [
                    KeyRequestService
                ]
            })
            .overrideTemplate(KeyRequestComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyRequestComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyRequestService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new KeyRequest('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keyRequests[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
