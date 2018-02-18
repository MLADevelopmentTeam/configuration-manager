package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.KeyValue;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the KeyValue entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyValueRepository extends MongoRepository<KeyValue, String> {

}
