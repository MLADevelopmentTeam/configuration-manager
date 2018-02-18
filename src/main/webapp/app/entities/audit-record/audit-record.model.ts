import { BaseEntity } from './../../shared';

export class AuditRecord implements BaseEntity {
    constructor(
        public id?: string,
        public what?: string,
        public when?: any,
        public why?: string,
        public where?: string,
    ) {
    }
}
