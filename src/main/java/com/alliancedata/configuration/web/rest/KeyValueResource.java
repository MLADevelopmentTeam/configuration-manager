package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.KeyValue;

import com.alliancedata.configuration.repository.KeyValueRepository;
import com.alliancedata.configuration.web.rest.errors.BadRequestAlertException;
import com.alliancedata.configuration.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing KeyValue.
 */
@RestController
@RequestMapping("/api")
public class KeyValueResource {

    private final Logger log = LoggerFactory.getLogger(KeyValueResource.class);

    private static final String ENTITY_NAME = "keyValue";

    private final KeyValueRepository keyValueRepository;

    public KeyValueResource(KeyValueRepository keyValueRepository) {
        this.keyValueRepository = keyValueRepository;
    }

    /**
     * POST  /key-values : Create a new keyValue.
     *
     * @param keyValue the keyValue to create
     * @return the ResponseEntity with status 201 (Created) and with body the new keyValue, or with status 400 (Bad Request) if the keyValue has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/key-values")
    @Timed
    public ResponseEntity<KeyValue> createKeyValue(@RequestBody KeyValue keyValue) throws URISyntaxException {
        log.debug("REST request to save KeyValue : {}", keyValue);
        if (keyValue.getId() != null) {
            throw new BadRequestAlertException("A new keyValue cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeyValue result = keyValueRepository.save(keyValue);
        return ResponseEntity.created(new URI("/api/key-values/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /key-values : Updates an existing keyValue.
     *
     * @param keyValue the keyValue to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated keyValue,
     * or with status 400 (Bad Request) if the keyValue is not valid,
     * or with status 500 (Internal Server Error) if the keyValue couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/key-values")
    @Timed
    public ResponseEntity<KeyValue> updateKeyValue(@RequestBody KeyValue keyValue) throws URISyntaxException {
        log.debug("REST request to update KeyValue : {}", keyValue);
        if (keyValue.getId() == null) {
            return createKeyValue(keyValue);
        }
        KeyValue result = keyValueRepository.save(keyValue);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, keyValue.getId().toString()))
            .body(result);
    }

    /**
     * GET  /key-values : get all the keyValues.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of keyValues in body
     */
    @GetMapping("/key-values")
    @Timed
    public List<KeyValue> getAllKeyValues() {
        log.debug("REST request to get all KeyValues");
        return keyValueRepository.findAll();
        }

    /**
     * GET  /key-values/:id : get the "id" keyValue.
     *
     * @param id the id of the keyValue to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the keyValue, or with status 404 (Not Found)
     */
    @GetMapping("/key-values/{id}")
    @Timed
    public ResponseEntity<KeyValue> getKeyValue(@PathVariable String id) {
        log.debug("REST request to get KeyValue : {}", id);
        KeyValue keyValue = keyValueRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(keyValue));
    }

    /**
     * DELETE  /key-values/:id : delete the "id" keyValue.
     *
     * @param id the id of the keyValue to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/key-values/{id}")
    @Timed
    public ResponseEntity<Void> deleteKeyValue(@PathVariable String id) {
        log.debug("REST request to delete KeyValue : {}", id);
        keyValueRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
