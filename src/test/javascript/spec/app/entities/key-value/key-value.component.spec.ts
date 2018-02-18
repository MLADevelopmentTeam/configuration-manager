/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyValueComponent } from '../../../../../../main/webapp/app/entities/key-value/key-value.component';
import { KeyValueService } from '../../../../../../main/webapp/app/entities/key-value/key-value.service';
import { KeyValue } from '../../../../../../main/webapp/app/entities/key-value/key-value.model';

describe('Component Tests', () => {

    describe('KeyValue Management Component', () => {
        let comp: KeyValueComponent;
        let fixture: ComponentFixture<KeyValueComponent>;
        let service: KeyValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyValueComponent],
                providers: [
                    KeyValueService
                ]
            })
            .overrideTemplate(KeyValueComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyValueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new KeyValue('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keyValues[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
