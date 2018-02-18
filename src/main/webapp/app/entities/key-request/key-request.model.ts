import { BaseEntity } from './../../shared';

export class KeyRequest implements BaseEntity {
    constructor(
        public id?: string,
        public closedDate?: any,
    ) {
    }
}
