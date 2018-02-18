import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Section } from './section.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Section>;

@Injectable()
export class SectionService {

    private resourceUrl =  SERVER_API_URL + 'api/sections';

    constructor(private http: HttpClient) { }

    create(section: Section): Observable<EntityResponseType> {
        const copy = this.convert(section);
        return this.http.post<Section>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(section: Section): Observable<EntityResponseType> {
        const copy = this.convert(section);
        return this.http.put<Section>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<Section>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Section[]>> {
        const options = createRequestOption(req);
        return this.http.get<Section[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Section[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Section = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Section[]>): HttpResponse<Section[]> {
        const jsonResponse: Section[] = res.body;
        const body: Section[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Section.
     */
    private convertItemFromServer(section: Section): Section {
        const copy: Section = Object.assign({}, section);
        return copy;
    }

    /**
     * Convert a Section to a JSON which can be sent to the server.
     */
    private convert(section: Section): Section {
        const copy: Section = Object.assign({}, section);
        return copy;
    }
}
