package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.Section;

import com.alliancedata.configuration.repository.SectionRepository;
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
 * REST controller for managing Section.
 */
@RestController
@RequestMapping("/api")
public class SectionResource {

    private final Logger log = LoggerFactory.getLogger(SectionResource.class);

    private static final String ENTITY_NAME = "section";

    private final SectionRepository sectionRepository;

    public SectionResource(SectionRepository sectionRepository) {
        this.sectionRepository = sectionRepository;
    }

    /**
     * POST  /sections : Create a new section.
     *
     * @param section the section to create
     * @return the ResponseEntity with status 201 (Created) and with body the new section, or with status 400 (Bad Request) if the section has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sections")
    @Timed
    public ResponseEntity<Section> createSection(@Valid @RequestBody Section section) throws URISyntaxException {
        log.debug("REST request to save Section : {}", section);
        if (section.getId() != null) {
            throw new BadRequestAlertException("A new section cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Section result = sectionRepository.save(section);
        return ResponseEntity.created(new URI("/api/sections/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sections : Updates an existing section.
     *
     * @param section the section to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated section,
     * or with status 400 (Bad Request) if the section is not valid,
     * or with status 500 (Internal Server Error) if the section couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sections")
    @Timed
    public ResponseEntity<Section> updateSection(@Valid @RequestBody Section section) throws URISyntaxException {
        log.debug("REST request to update Section : {}", section);
        if (section.getId() == null) {
            return createSection(section);
        }
        Section result = sectionRepository.save(section);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, section.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sections : get all the sections.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of sections in body
     */
    @GetMapping("/sections")
    @Timed
    public List<Section> getAllSections() {
        log.debug("REST request to get all Sections");
        return sectionRepository.findAll();
        }

    /**
     * GET  /sections/:id : get the "id" section.
     *
     * @param id the id of the section to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the section, or with status 404 (Not Found)
     */
    @GetMapping("/sections/{id}")
    @Timed
    public ResponseEntity<Section> getSection(@PathVariable String id) {
        log.debug("REST request to get Section : {}", id);
        Section section = sectionRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(section));
    }

    /**
     * DELETE  /sections/:id : delete the "id" section.
     *
     * @param id the id of the section to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sections/{id}")
    @Timed
    public ResponseEntity<Void> deleteSection(@PathVariable String id) {
        log.debug("REST request to delete Section : {}", id);
        sectionRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
