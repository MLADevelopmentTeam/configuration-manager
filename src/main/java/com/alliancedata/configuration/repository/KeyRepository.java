package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.Key;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Key entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyRepository extends MongoRepository<Key, String> {

}
