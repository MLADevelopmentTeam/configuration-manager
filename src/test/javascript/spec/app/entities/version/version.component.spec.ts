/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { VersionComponent } from '../../../../../../main/webapp/app/entities/version/version.component';
import { VersionService } from '../../../../../../main/webapp/app/entities/version/version.service';
import { Version } from '../../../../../../main/webapp/app/entities/version/version.model';

describe('Component Tests', () => {

    describe('Version Management Component', () => {
        let comp: VersionComponent;
        let fixture: ComponentFixture<VersionComponent>;
        let service: VersionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [VersionComponent],
                providers: [
                    VersionService
                ]
            })
            .overrideTemplate(VersionComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VersionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Version('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.versions[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
