import { BaseEntity } from './../../shared';

export class Client implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
