import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { KeyRequest } from './key-request.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<KeyRequest>;

@Injectable()
export class KeyRequestService {

    private resourceUrl =  SERVER_API_URL + 'api/key-requests';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(keyRequest: KeyRequest): Observable<EntityResponseType> {
        const copy = this.convert(keyRequest);
        return this.http.post<KeyRequest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keyRequest: KeyRequest): Observable<EntityResponseType> {
        const copy = this.convert(keyRequest);
        return this.http.put<KeyRequest>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<KeyRequest>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<KeyRequest[]>> {
        const options = createRequestOption(req);
        return this.http.get<KeyRequest[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KeyRequest[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: KeyRequest = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<KeyRequest[]>): HttpResponse<KeyRequest[]> {
        const jsonResponse: KeyRequest[] = res.body;
        const body: KeyRequest[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to KeyRequest.
     */
    private convertItemFromServer(keyRequest: KeyRequest): KeyRequest {
        const copy: KeyRequest = Object.assign({}, keyRequest);
        copy.closedDate = this.dateUtils
            .convertLocalDateFromServer(keyRequest.closedDate);
        return copy;
    }

    /**
     * Convert a KeyRequest to a JSON which can be sent to the server.
     */
    private convert(keyRequest: KeyRequest): KeyRequest {
        const copy: KeyRequest = Object.assign({}, keyRequest);
        copy.closedDate = this.dateUtils
            .convertLocalDateToServer(keyRequest.closedDate);
        return copy;
    }
}
