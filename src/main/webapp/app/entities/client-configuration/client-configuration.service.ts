import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ClientConfiguration } from './client-configuration.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClientConfiguration>;

@Injectable()
export class ClientConfigurationService {

    private resourceUrl =  SERVER_API_URL + 'api/client-configurations';

    constructor(private http: HttpClient) { }

    create(clientConfiguration: ClientConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(clientConfiguration);
        return this.http.post<ClientConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clientConfiguration: ClientConfiguration): Observable<EntityResponseType> {
        const copy = this.convert(clientConfiguration);
        return this.http.put<ClientConfiguration>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<ClientConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClientConfiguration[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClientConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClientConfiguration[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClientConfiguration = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClientConfiguration[]>): HttpResponse<ClientConfiguration[]> {
        const jsonResponse: ClientConfiguration[] = res.body;
        const body: ClientConfiguration[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClientConfiguration.
     */
    private convertItemFromServer(clientConfiguration: ClientConfiguration): ClientConfiguration {
        const copy: ClientConfiguration = Object.assign({}, clientConfiguration);
        return copy;
    }

    /**
     * Convert a ClientConfiguration to a JSON which can be sent to the server.
     */
    private convert(clientConfiguration: ClientConfiguration): ClientConfiguration {
        const copy: ClientConfiguration = Object.assign({}, clientConfiguration);
        return copy;
    }
}
