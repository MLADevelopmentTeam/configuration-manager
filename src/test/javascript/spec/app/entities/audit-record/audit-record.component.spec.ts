/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConfigurationTestModule } from '../../../test.module';
import { AuditRecordComponent } from '../../../../../../main/webapp/app/entities/audit-record/audit-record.component';
import { AuditRecordService } from '../../../../../../main/webapp/app/entities/audit-record/audit-record.service';
import { AuditRecord } from '../../../../../../main/webapp/app/entities/audit-record/audit-record.model';

describe('Component Tests', () => {

    describe('AuditRecord Management Component', () => {
        let comp: AuditRecordComponent;
        let fixture: ComponentFixture<AuditRecordComponent>;
        let service: AuditRecordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [AuditRecordComponent],
                providers: [
                    AuditRecordService
                ]
            })
            .overrideTemplate(AuditRecordComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuditRecordComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuditRecordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AuditRecord('123')],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.auditRecords[0]).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
