package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.ClientConfiguration;
import com.alliancedata.configuration.repository.ClientConfigurationRepository;
import com.alliancedata.configuration.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static com.alliancedata.configuration.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClientConfigurationResource REST controller.
 *
 * @see ClientConfigurationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class ClientConfigurationResourceIntTest {

    @Autowired
    private ClientConfigurationRepository clientConfigurationRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restClientConfigurationMockMvc;

    private ClientConfiguration clientConfiguration;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientConfigurationResource clientConfigurationResource = new ClientConfigurationResource(clientConfigurationRepository);
        this.restClientConfigurationMockMvc = MockMvcBuilders.standaloneSetup(clientConfigurationResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientConfiguration createEntity() {
        ClientConfiguration clientConfiguration = new ClientConfiguration();
        return clientConfiguration;
    }

    @Before
    public void initTest() {
        clientConfigurationRepository.deleteAll();
        clientConfiguration = createEntity();
    }

    @Test
    public void createClientConfiguration() throws Exception {
        int databaseSizeBeforeCreate = clientConfigurationRepository.findAll().size();

        // Create the ClientConfiguration
        restClientConfigurationMockMvc.perform(post("/api/client-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientConfiguration)))
            .andExpect(status().isCreated());

        // Validate the ClientConfiguration in the database
        List<ClientConfiguration> clientConfigurationList = clientConfigurationRepository.findAll();
        assertThat(clientConfigurationList).hasSize(databaseSizeBeforeCreate + 1);
        ClientConfiguration testClientConfiguration = clientConfigurationList.get(clientConfigurationList.size() - 1);
    }

    @Test
    public void createClientConfigurationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientConfigurationRepository.findAll().size();

        // Create the ClientConfiguration with an existing ID
        clientConfiguration.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientConfigurationMockMvc.perform(post("/api/client-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientConfiguration)))
            .andExpect(status().isBadRequest());

        // Validate the ClientConfiguration in the database
        List<ClientConfiguration> clientConfigurationList = clientConfigurationRepository.findAll();
        assertThat(clientConfigurationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllClientConfigurations() throws Exception {
        // Initialize the database
        clientConfigurationRepository.save(clientConfiguration);

        // Get all the clientConfigurationList
        restClientConfigurationMockMvc.perform(get("/api/client-configurations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientConfiguration.getId())));
    }

    @Test
    public void getClientConfiguration() throws Exception {
        // Initialize the database
        clientConfigurationRepository.save(clientConfiguration);

        // Get the clientConfiguration
        restClientConfigurationMockMvc.perform(get("/api/client-configurations/{id}", clientConfiguration.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientConfiguration.getId()));
    }

    @Test
    public void getNonExistingClientConfiguration() throws Exception {
        // Get the clientConfiguration
        restClientConfigurationMockMvc.perform(get("/api/client-configurations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateClientConfiguration() throws Exception {
        // Initialize the database
        clientConfigurationRepository.save(clientConfiguration);
        int databaseSizeBeforeUpdate = clientConfigurationRepository.findAll().size();

        // Update the clientConfiguration
        ClientConfiguration updatedClientConfiguration = clientConfigurationRepository.findOne(clientConfiguration.getId());

        restClientConfigurationMockMvc.perform(put("/api/client-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientConfiguration)))
            .andExpect(status().isOk());

        // Validate the ClientConfiguration in the database
        List<ClientConfiguration> clientConfigurationList = clientConfigurationRepository.findAll();
        assertThat(clientConfigurationList).hasSize(databaseSizeBeforeUpdate);
        ClientConfiguration testClientConfiguration = clientConfigurationList.get(clientConfigurationList.size() - 1);
    }

    @Test
    public void updateNonExistingClientConfiguration() throws Exception {
        int databaseSizeBeforeUpdate = clientConfigurationRepository.findAll().size();

        // Create the ClientConfiguration

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restClientConfigurationMockMvc.perform(put("/api/client-configurations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientConfiguration)))
            .andExpect(status().isCreated());

        // Validate the ClientConfiguration in the database
        List<ClientConfiguration> clientConfigurationList = clientConfigurationRepository.findAll();
        assertThat(clientConfigurationList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteClientConfiguration() throws Exception {
        // Initialize the database
        clientConfigurationRepository.save(clientConfiguration);
        int databaseSizeBeforeDelete = clientConfigurationRepository.findAll().size();

        // Get the clientConfiguration
        restClientConfigurationMockMvc.perform(delete("/api/client-configurations/{id}", clientConfiguration.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientConfiguration> clientConfigurationList = clientConfigurationRepository.findAll();
        assertThat(clientConfigurationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientConfiguration.class);
        ClientConfiguration clientConfiguration1 = new ClientConfiguration();
        clientConfiguration1.setId("id1");
        ClientConfiguration clientConfiguration2 = new ClientConfiguration();
        clientConfiguration2.setId(clientConfiguration1.getId());
        assertThat(clientConfiguration1).isEqualTo(clientConfiguration2);
        clientConfiguration2.setId("id2");
        assertThat(clientConfiguration1).isNotEqualTo(clientConfiguration2);
        clientConfiguration1.setId(null);
        assertThat(clientConfiguration1).isNotEqualTo(clientConfiguration2);
    }
}
