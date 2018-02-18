import { BaseEntity } from './../../shared';

export class Role implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
