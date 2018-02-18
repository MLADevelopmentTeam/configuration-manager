import { BaseEntity } from './../../shared';

export class Version implements BaseEntity {
    constructor(
        public id?: string,
        public name?: string,
    ) {
    }
}
