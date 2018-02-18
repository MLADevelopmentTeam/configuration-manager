package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.Version;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Version entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VersionRepository extends MongoRepository<Version, String> {

}
