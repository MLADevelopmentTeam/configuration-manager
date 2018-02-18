import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { KeyValue } from './key-value.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<KeyValue>;

@Injectable()
export class KeyValueService {

    private resourceUrl =  SERVER_API_URL + 'api/key-values';

    constructor(private http: HttpClient) { }

    create(keyValue: KeyValue): Observable<EntityResponseType> {
        const copy = this.convert(keyValue);
        return this.http.post<KeyValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(keyValue: KeyValue): Observable<EntityResponseType> {
        const copy = this.convert(keyValue);
        return this.http.put<KeyValue>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<KeyValue>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<KeyValue[]>> {
        const options = createRequestOption(req);
        return this.http.get<KeyValue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<KeyValue[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: KeyValue = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<KeyValue[]>): HttpResponse<KeyValue[]> {
        const jsonResponse: KeyValue[] = res.body;
        const body: KeyValue[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to KeyValue.
     */
    private convertItemFromServer(keyValue: KeyValue): KeyValue {
        const copy: KeyValue = Object.assign({}, keyValue);
        return copy;
    }

    /**
     * Convert a KeyValue to a JSON which can be sent to the server.
     */
    private convert(keyValue: KeyValue): KeyValue {
        const copy: KeyValue = Object.assign({}, keyValue);
        return copy;
    }
}
