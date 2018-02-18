import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Key } from './key.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Key>;

@Injectable()
export class KeyService {

    private resourceUrl =  SERVER_API_URL + 'api/keys';

    constructor(private http: HttpClient) { }

    create(key: Key): Observable<EntityResponseType> {
        const copy = this.convert(key);
        return this.http.post<Key>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(key: Key): Observable<EntityResponseType> {
        const copy = this.convert(key);
        return this.http.put<Key>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<Key>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Key[]>> {
        const options = createRequestOption(req);
        return this.http.get<Key[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Key[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Key = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Key[]>): HttpResponse<Key[]> {
        const jsonResponse: Key[] = res.body;
        const body: Key[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Key.
     */
    private convertItemFromServer(key: Key): Key {
        const copy: Key = Object.assign({}, key);
        return copy;
    }

    /**
     * Convert a Key to a JSON which can be sent to the server.
     */
    private convert(key: Key): Key {
        const copy: Key = Object.assign({}, key);
        return copy;
    }
}
