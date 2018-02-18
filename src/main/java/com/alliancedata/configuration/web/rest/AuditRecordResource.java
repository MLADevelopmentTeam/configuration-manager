package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.AuditRecord;

import com.alliancedata.configuration.repository.AuditRecordRepository;
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
 * REST controller for managing AuditRecord.
 */
@RestController
@RequestMapping("/api")
public class AuditRecordResource {

    private final Logger log = LoggerFactory.getLogger(AuditRecordResource.class);

    private static final String ENTITY_NAME = "auditRecord";

    private final AuditRecordRepository auditRecordRepository;

    public AuditRecordResource(AuditRecordRepository auditRecordRepository) {
        this.auditRecordRepository = auditRecordRepository;
    }

    /**
     * POST  /audit-records : Create a new auditRecord.
     *
     * @param auditRecord the auditRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new auditRecord, or with status 400 (Bad Request) if the auditRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/audit-records")
    @Timed
    public ResponseEntity<AuditRecord> createAuditRecord(@Valid @RequestBody AuditRecord auditRecord) throws URISyntaxException {
        log.debug("REST request to save AuditRecord : {}", auditRecord);
        if (auditRecord.getId() != null) {
            throw new BadRequestAlertException("A new auditRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AuditRecord result = auditRecordRepository.save(auditRecord);
        return ResponseEntity.created(new URI("/api/audit-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /audit-records : Updates an existing auditRecord.
     *
     * @param auditRecord the auditRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated auditRecord,
     * or with status 400 (Bad Request) if the auditRecord is not valid,
     * or with status 500 (Internal Server Error) if the auditRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/audit-records")
    @Timed
    public ResponseEntity<AuditRecord> updateAuditRecord(@Valid @RequestBody AuditRecord auditRecord) throws URISyntaxException {
        log.debug("REST request to update AuditRecord : {}", auditRecord);
        if (auditRecord.getId() == null) {
            return createAuditRecord(auditRecord);
        }
        AuditRecord result = auditRecordRepository.save(auditRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, auditRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /audit-records : get all the auditRecords.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of auditRecords in body
     */
    @GetMapping("/audit-records")
    @Timed
    public List<AuditRecord> getAllAuditRecords() {
        log.debug("REST request to get all AuditRecords");
        return auditRecordRepository.findAll();
        }

    /**
     * GET  /audit-records/:id : get the "id" auditRecord.
     *
     * @param id the id of the auditRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the auditRecord, or with status 404 (Not Found)
     */
    @GetMapping("/audit-records/{id}")
    @Timed
    public ResponseEntity<AuditRecord> getAuditRecord(@PathVariable String id) {
        log.debug("REST request to get AuditRecord : {}", id);
        AuditRecord auditRecord = auditRecordRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(auditRecord));
    }

    /**
     * DELETE  /audit-records/:id : delete the "id" auditRecord.
     *
     * @param id the id of the auditRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/audit-records/{id}")
    @Timed
    public ResponseEntity<Void> deleteAuditRecord(@PathVariable String id) {
        log.debug("REST request to delete AuditRecord : {}", id);
        auditRecordRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
