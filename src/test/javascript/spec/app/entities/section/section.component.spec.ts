/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { SectionComponent } from '../../../../../../main/webapp/app/entities/section/section.component';
import { SectionService } from '../../../../../../main/webapp/app/entities/section/section.service';
import { Section } from '../../../../../../main/webapp/app/entities/section/section.model';

describe('Component Tests', () => {

    describe('Section Management Component', () => {
        let comp: SectionComponent;
        let fixture: ComponentFixture<SectionComponent>;
        let service: SectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [SectionComponent],
                providers: [
                    SectionService
                ]
            })
            .overrideTemplate(SectionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Section('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.sections[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
