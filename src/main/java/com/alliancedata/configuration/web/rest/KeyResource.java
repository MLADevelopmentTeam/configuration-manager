package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.Key;

import com.alliancedata.configuration.repository.KeyRepository;
import com.alliancedata.configuration.web.rest.errors.BadRequestAlertException;
import com.alliancedata.configuration.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Key.
 */
@RestController
@RequestMapping("/api")
public class KeyResource {

    private final Logger log = LoggerFactory.getLogger(KeyResource.class);

    private static final String ENTITY_NAME = "key";

    private final KeyRepository keyRepository;

    public KeyResource(KeyRepository keyRepository) {
        this.keyRepository = keyRepository;
    }

    /**
     * POST  /keys : Create a new key.
     *
     * @param key the key to create
     * @return the ResponseEntity with status 201 (Created) and with body the new key, or with status 400 (Bad Request) if the key has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/keys")
    @Timed
    public ResponseEntity<Key> createKey(@Valid @RequestBody Key key) throws URISyntaxException {
        log.debug("REST request to save Key : {}", key);
        if (key.getId() != null) {
            throw new BadRequestAlertException("A new key cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Key result = keyRepository.save(key);
        return ResponseEntity.created(new URI("/api/keys/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /keys : Updates an existing key.
     *
     * @param key the key to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated key,
     * or with status 400 (Bad Request) if the key is not valid,
     * or with status 500 (Internal Server Error) if the key couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/keys")
    @Timed
    public ResponseEntity<Key> updateKey(@Valid @RequestBody Key key) throws URISyntaxException {
        log.debug("REST request to update Key : {}", key);
        if (key.getId() == null) {
            return createKey(key);
        }
        Key result = keyRepository.save(key);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, key.getId().toString()))
            .body(result);
    }

    /**
     * GET  /keys : get all the keys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of keys in body
     */
    @GetMapping("/keys")
    @Timed
    public List<Key> getAllKeys() {
        log.debug("REST request to get all Keys");
        return keyRepository.findAll();
        }

    /**
     * GET  /keys/:id : get the "id" key.
     *
     * @param id the id of the key to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the key, or with status 404 (Not Found)
     */
    @GetMapping("/keys/{id}")
    @Timed
    public ResponseEntity<Key> getKey(@PathVariable String id) {
        log.debug("REST request to get Key : {}", id);
        Key key = keyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(key));
    }

    /**
     * DELETE  /keys/:id : delete the "id" key.
     *
     * @param id the id of the key to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/keys/{id}")
    @Timed
    public ResponseEntity<Void> deleteKey(@PathVariable String id) {
        log.debug("REST request to delete Key : {}", id);
        keyRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
