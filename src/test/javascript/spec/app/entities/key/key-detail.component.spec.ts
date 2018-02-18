/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyDetailComponent } from '../../../../../../main/webapp/app/entities/key/key-detail.component';
import { KeyService } from '../../../../../../main/webapp/app/entities/key/key.service';
import { Key } from '../../../../../../main/webapp/app/entities/key/key.model';

describe('Component Tests', () => {

    describe('Key Management Detail Component', () => {
        let comp: KeyDetailComponent;
        let fixture: ComponentFixture<KeyDetailComponent>;
        let service: KeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyDetailComponent],
                providers: [
                    KeyService
                ]
            })
            .overrideTemplate(KeyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Key('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.key).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
