/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyValueDetailComponent } from '../../../../../../main/webapp/app/entities/key-value/key-value-detail.component';
import { KeyValueService } from '../../../../../../main/webapp/app/entities/key-value/key-value.service';
import { KeyValue } from '../../../../../../main/webapp/app/entities/key-value/key-value.model';

describe('Component Tests', () => {

    describe('KeyValue Management Detail Component', () => {
        let comp: KeyValueDetailComponent;
        let fixture: ComponentFixture<KeyValueDetailComponent>;
        let service: KeyValueService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyValueDetailComponent],
                providers: [
                    KeyValueService
                ]
            })
            .overrideTemplate(KeyValueDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyValueDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyValueService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new KeyValue('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.keyValue).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
