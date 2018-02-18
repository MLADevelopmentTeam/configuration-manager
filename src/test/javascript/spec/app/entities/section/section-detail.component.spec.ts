/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { SectionDetailComponent } from '../../../../../../main/webapp/app/entities/section/section-detail.component';
import { SectionService } from '../../../../../../main/webapp/app/entities/section/section.service';
import { Section } from '../../../../../../main/webapp/app/entities/section/section.model';

describe('Component Tests', () => {

    describe('Section Management Detail Component', () => {
        let comp: SectionDetailComponent;
        let fixture: ComponentFixture<SectionDetailComponent>;
        let service: SectionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [SectionDetailComponent],
                providers: [
                    SectionService
                ]
            })
            .overrideTemplate(SectionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SectionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SectionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Section('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.section).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
