import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { AuditRecord } from './audit-record.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AuditRecord>;

@Injectable()
export class AuditRecordService {

    private resourceUrl =  SERVER_API_URL + 'api/audit-records';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(auditRecord: AuditRecord): Observable<EntityResponseType> {
        const copy = this.convert(auditRecord);
        return this.http.post<AuditRecord>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(auditRecord: AuditRecord): Observable<EntityResponseType> {
        const copy = this.convert(auditRecord);
        return this.http.put<AuditRecord>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<AuditRecord>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AuditRecord[]>> {
        const options = createRequestOption(req);
        return this.http.get<AuditRecord[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AuditRecord[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AuditRecord = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AuditRecord[]>): HttpResponse<AuditRecord[]> {
        const jsonResponse: AuditRecord[] = res.body;
        const body: AuditRecord[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AuditRecord.
     */
    private convertItemFromServer(auditRecord: AuditRecord): AuditRecord {
        const copy: AuditRecord = Object.assign({}, auditRecord);
        copy.when = this.dateUtils
            .convertLocalDateFromServer(auditRecord.when);
        return copy;
    }

    /**
     * Convert a AuditRecord to a JSON which can be sent to the server.
     */
    private convert(auditRecord: AuditRecord): AuditRecord {
        const copy: AuditRecord = Object.assign({}, auditRecord);
        copy.when = this.dateUtils
            .convertLocalDateToServer(auditRecord.when);
        return copy;
    }
}
