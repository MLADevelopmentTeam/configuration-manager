import { BaseEntity } from './../../shared';

export class Note implements BaseEntity {
    constructor(
        public id?: string,
        public message?: string,
    ) {
    }
}
