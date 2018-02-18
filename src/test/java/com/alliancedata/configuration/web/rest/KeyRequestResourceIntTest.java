package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.KeyRequest;
import com.alliancedata.configuration.repository.KeyRequestRepository;
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

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.alliancedata.configuration.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the KeyRequestResource REST controller.
 *
 * @see KeyRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class KeyRequestResourceIntTest {

    private static final LocalDate DEFAULT_CLOSED_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CLOSED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private KeyRequestRepository keyRequestRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restKeyRequestMockMvc;

    private KeyRequest keyRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyRequestResource keyRequestResource = new KeyRequestResource(keyRequestRepository);
        this.restKeyRequestMockMvc = MockMvcBuilders.standaloneSetup(keyRequestResource)
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
    public static KeyRequest createEntity() {
        KeyRequest keyRequest = new KeyRequest()
            .closedDate(DEFAULT_CLOSED_DATE);
        return keyRequest;
    }

    @Before
    public void initTest() {
        keyRequestRepository.deleteAll();
        keyRequest = createEntity();
    }

    @Test
    public void createKeyRequest() throws Exception {
        int databaseSizeBeforeCreate = keyRequestRepository.findAll().size();

        // Create the KeyRequest
        restKeyRequestMockMvc.perform(post("/api/key-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyRequest)))
            .andExpect(status().isCreated());

        // Validate the KeyRequest in the database
        List<KeyRequest> keyRequestList = keyRequestRepository.findAll();
        assertThat(keyRequestList).hasSize(databaseSizeBeforeCreate + 1);
        KeyRequest testKeyRequest = keyRequestList.get(keyRequestList.size() - 1);
        assertThat(testKeyRequest.getClosedDate()).isEqualTo(DEFAULT_CLOSED_DATE);
    }

    @Test
    public void createKeyRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyRequestRepository.findAll().size();

        // Create the KeyRequest with an existing ID
        keyRequest.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyRequestMockMvc.perform(post("/api/key-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyRequest)))
            .andExpect(status().isBadRequest());

        // Validate the KeyRequest in the database
        List<KeyRequest> keyRequestList = keyRequestRepository.findAll();
        assertThat(keyRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllKeyRequests() throws Exception {
        // Initialize the database
        keyRequestRepository.save(keyRequest);

        // Get all the keyRequestList
        restKeyRequestMockMvc.perform(get("/api/key-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyRequest.getId())))
            .andExpect(jsonPath("$.[*].closedDate").value(hasItem(DEFAULT_CLOSED_DATE.toString())));
    }

    @Test
    public void getKeyRequest() throws Exception {
        // Initialize the database
        keyRequestRepository.save(keyRequest);

        // Get the keyRequest
        restKeyRequestMockMvc.perform(get("/api/key-requests/{id}", keyRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keyRequest.getId()))
            .andExpect(jsonPath("$.closedDate").value(DEFAULT_CLOSED_DATE.toString()));
    }

    @Test
    public void getNonExistingKeyRequest() throws Exception {
        // Get the keyRequest
        restKeyRequestMockMvc.perform(get("/api/key-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateKeyRequest() throws Exception {
        // Initialize the database
        keyRequestRepository.save(keyRequest);
        int databaseSizeBeforeUpdate = keyRequestRepository.findAll().size();

        // Update the keyRequest
        KeyRequest updatedKeyRequest = keyRequestRepository.findOne(keyRequest.getId());
        updatedKeyRequest
            .closedDate(UPDATED_CLOSED_DATE);

        restKeyRequestMockMvc.perform(put("/api/key-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeyRequest)))
            .andExpect(status().isOk());

        // Validate the KeyRequest in the database
        List<KeyRequest> keyRequestList = keyRequestRepository.findAll();
        assertThat(keyRequestList).hasSize(databaseSizeBeforeUpdate);
        KeyRequest testKeyRequest = keyRequestList.get(keyRequestList.size() - 1);
        assertThat(testKeyRequest.getClosedDate()).isEqualTo(UPDATED_CLOSED_DATE);
    }

    @Test
    public void updateNonExistingKeyRequest() throws Exception {
        int databaseSizeBeforeUpdate = keyRequestRepository.findAll().size();

        // Create the KeyRequest

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKeyRequestMockMvc.perform(put("/api/key-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyRequest)))
            .andExpect(status().isCreated());

        // Validate the KeyRequest in the database
        List<KeyRequest> keyRequestList = keyRequestRepository.findAll();
        assertThat(keyRequestList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteKeyRequest() throws Exception {
        // Initialize the database
        keyRequestRepository.save(keyRequest);
        int databaseSizeBeforeDelete = keyRequestRepository.findAll().size();

        // Get the keyRequest
        restKeyRequestMockMvc.perform(delete("/api/key-requests/{id}", keyRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<KeyRequest> keyRequestList = keyRequestRepository.findAll();
        assertThat(keyRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyRequest.class);
        KeyRequest keyRequest1 = new KeyRequest();
        keyRequest1.setId("id1");
        KeyRequest keyRequest2 = new KeyRequest();
        keyRequest2.setId(keyRequest1.getId());
        assertThat(keyRequest1).isEqualTo(keyRequest2);
        keyRequest2.setId("id2");
        assertThat(keyRequest1).isNotEqualTo(keyRequest2);
        keyRequest1.setId(null);
        assertThat(keyRequest1).isNotEqualTo(keyRequest2);
    }
}
