import { BaseEntity } from './../../shared';

export class Key implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
