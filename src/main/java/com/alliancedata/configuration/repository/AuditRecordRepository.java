package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.AuditRecord;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the AuditRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AuditRecordRepository extends MongoRepository<AuditRecord, String> {

}
