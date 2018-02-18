package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.Section;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Section entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SectionRepository extends MongoRepository<Section, String> {

}
