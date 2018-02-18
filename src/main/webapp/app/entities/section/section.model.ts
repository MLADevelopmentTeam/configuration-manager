import { BaseEntity } from './../../shared';

export class Section implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
