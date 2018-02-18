package com.alliancedata.configuration.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alliancedata.configuration.domain.ClientConfiguration;

import com.alliancedata.configuration.repository.ClientConfigurationRepository;
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
 * REST controller for managing ClientConfiguration.
 */
@RestController
@RequestMapping("/api")
public class ClientConfigurationResource {

    private final Logger log = LoggerFactory.getLogger(ClientConfigurationResource.class);

    private static final String ENTITY_NAME = "clientConfiguration";

    private final ClientConfigurationRepository clientConfigurationRepository;

    public ClientConfigurationResource(ClientConfigurationRepository clientConfigurationRepository) {
        this.clientConfigurationRepository = clientConfigurationRepository;
    }

    /**
     * POST  /client-configurations : Create a new clientConfiguration.
     *
     * @param clientConfiguration the clientConfiguration to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientConfiguration, or with status 400 (Bad Request) if the clientConfiguration has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-configurations")
    @Timed
    public ResponseEntity<ClientConfiguration> createClientConfiguration(@RequestBody ClientConfiguration clientConfiguration) throws URISyntaxException {
        log.debug("REST request to save ClientConfiguration : {}", clientConfiguration);
        if (clientConfiguration.getId() != null) {
            throw new BadRequestAlertException("A new clientConfiguration cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientConfiguration result = clientConfigurationRepository.save(clientConfiguration);
        return ResponseEntity.created(new URI("/api/client-configurations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-configurations : Updates an existing clientConfiguration.
     *
     * @param clientConfiguration the clientConfiguration to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientConfiguration,
     * or with status 400 (Bad Request) if the clientConfiguration is not valid,
     * or with status 500 (Internal Server Error) if the clientConfiguration couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-configurations")
    @Timed
    public ResponseEntity<ClientConfiguration> updateClientConfiguration(@RequestBody ClientConfiguration clientConfiguration) throws URISyntaxException {
        log.debug("REST request to update ClientConfiguration : {}", clientConfiguration);
        if (clientConfiguration.getId() == null) {
            return createClientConfiguration(clientConfiguration);
        }
        ClientConfiguration result = clientConfigurationRepository.save(clientConfiguration);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientConfiguration.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-configurations : get all the clientConfigurations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clientConfigurations in body
     */
    @GetMapping("/client-configurations")
    @Timed
    public List<ClientConfiguration> getAllClientConfigurations() {
        log.debug("REST request to get all ClientConfigurations");
        return clientConfigurationRepository.findAll();
        }

    /**
     * GET  /client-configurations/:id : get the "id" clientConfiguration.
     *
     * @param id the id of the clientConfiguration to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientConfiguration, or with status 404 (Not Found)
     */
    @GetMapping("/client-configurations/{id}")
    @Timed
    public ResponseEntity<ClientConfiguration> getClientConfiguration(@PathVariable String id) {
        log.debug("REST request to get ClientConfiguration : {}", id);
        ClientConfiguration clientConfiguration = clientConfigurationRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(clientConfiguration));
    }

    /**
     * DELETE  /client-configurations/:id : delete the "id" clientConfiguration.
     *
     * @param id the id of the clientConfiguration to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-configurations/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientConfiguration(@PathVariable String id) {
        log.debug("REST request to delete ClientConfiguration : {}", id);
        clientConfigurationRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id)).build();
    }
}
