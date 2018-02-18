package com.alliancedata.configuration.repository;

import com.alliancedata.configuration.domain.Role;
import org.springframework.stereotype.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Spring Data MongoDB repository for the Role entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoleRepository extends MongoRepository<Role, String> {

}
