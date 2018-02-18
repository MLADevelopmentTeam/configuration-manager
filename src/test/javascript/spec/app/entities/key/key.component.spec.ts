/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { KeyComponent } from '../../../../../../main/webapp/app/entities/key/key.component';
import { KeyService } from '../../../../../../main/webapp/app/entities/key/key.service';
import { Key } from '../../../../../../main/webapp/app/entities/key/key.model';

describe('Component Tests', () => {

    describe('Key Management Component', () => {
        let comp: KeyComponent;
        let fixture: ComponentFixture<KeyComponent>;
        let service: KeyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [KeyComponent],
                providers: [
                    KeyService
                ]
            })
            .overrideTemplate(KeyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Key('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keys[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
