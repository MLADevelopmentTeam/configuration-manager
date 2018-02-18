/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ConfigurationTestModule } from '../../../test.module';
import { AuditRecordDetailComponent } from '../../../../../../main/webapp/app/entities/audit-record/audit-record-detail.component';
import { AuditRecordService } from '../../../../../../main/webapp/app/entities/audit-record/audit-record.service';
import { AuditRecord } from '../../../../../../main/webapp/app/entities/audit-record/audit-record.model';

describe('Component Tests', () => {

    describe('AuditRecord Management Detail Component', () => {
        let comp: AuditRecordDetailComponent;
        let fixture: ComponentFixture<AuditRecordDetailComponent>;
        let service: AuditRecordService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ConfigurationTestModule],
                declarations: [AuditRecordDetailComponent],
                providers: [
                    AuditRecordService
                ]
            })
            .overrideTemplate(AuditRecordDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AuditRecordDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AuditRecordService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AuditRecord('123')
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith('123');
                expect(comp.auditRecord).toEqual(jasmine.objectContaining({id: '123'}));
            });
        });
    });

});
