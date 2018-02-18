package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.KeyRequest;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the KeyRequest entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KeyRequestRepository extends MongoRepository<KeyRequest, String> {

}
