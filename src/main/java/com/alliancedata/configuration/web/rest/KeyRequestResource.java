package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.KeyRequest;

import com.alliancedata.configuration.repository.KeyRequestRepository;
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
 * REST controller for managing KeyRequest.
 */
@RestController
@RequestMapping("/api")
public class KeyRequestResource {

    private final Logger log = LoggerFactory.getLogger(KeyRequestResource.class);

    private static final String ENTITY_NAME = "keyRequest";

    private final KeyRequestRepository keyRequestRepository;

    public KeyRequestResource(KeyRequestRepository keyRequestRepository) {
        this.keyRequestRepository = keyRequestRepository;
    }

    /**
     * POST  /key-requests : Create a new keyRequest.
     *
     * @param keyRequest the keyRequest to create
     * @return the ResponseEntity with status 201 (Created) and with body the new keyRequest, or with status 400 (Bad Request) if the keyRequest has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/key-requests")
    @Timed
    public ResponseEntity<KeyRequest> createKeyRequest(@RequestBody KeyRequest keyRequest) throws URISyntaxException {
        log.debug("REST request to save KeyRequest : {}", keyRequest);
        if (keyRequest.getId() != null) {
            throw new BadRequestAlertException("A new keyRequest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KeyRequest result = keyRequestRepository.save(keyRequest);
        return ResponseEntity.created(new URI("/api/key-requests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /key-requests : Updates an existing keyRequest.
     *
     * @param keyRequest the keyRequest to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated keyRequest,
     * or with status 400 (Bad Request) if the keyRequest is not valid,
     * or with status 500 (Internal Server Error) if the keyRequest couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/key-requests")
    @Timed
    public ResponseEntity<KeyRequest> updateKeyRequest(@RequestBody KeyRequest keyRequest) throws URISyntaxException {
        log.debug("REST request to update KeyRequest : {}", keyRequest);
        if (keyRequest.getId() == null) {
            return createKeyRequest(keyRequest);
        }
        KeyRequest result = keyRequestRepository.save(keyRequest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, keyRequest.getId().toString()))
            .body(result);
    }

    /**
     * GET  /key-requests : get all the keyRequests.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of keyRequests in body
     */
    @GetMapping("/key-requests")
    @Timed
    public List<KeyRequest> getAllKeyRequests() {
        log.debug("REST request to get all KeyRequests");
        return keyRequestRepository.findAll();
        }

    /**
     * GET  /key-requests/:id : get the "id" keyRequest.
     *
     * @param id the id of the keyRequest to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the keyRequest, or with status 404 (Not Found)
     */
    @GetMapping("/key-requests/{id}")
    @Timed
    public ResponseEntity<KeyRequest> getKeyRequest(@PathVariable String id) {
        log.debug("REST request to get KeyRequest : {}", id);
        KeyRequest keyRequest = keyRequestRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(keyRequest));
    }

    /**
     * DELETE  /key-requests/:id : delete the "id" keyRequest.
     *
     * @param id the id of the keyRequest to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/key-requests/{id}")
    @Timed
    public ResponseEntity<Void> deleteKeyRequest(@PathVariable String id) {
        log.debug("REST request to delete KeyRequest : {}", id);
        keyRequestRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
