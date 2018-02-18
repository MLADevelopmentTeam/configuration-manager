package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.KeyValue;
import com.alliancedata.configuration.repository.KeyValueRepository;
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
 * Test class for the KeyValueResource REST controller.
 *
 * @see KeyValueResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class KeyValueResourceIntTest {

    @Autowired
    private KeyValueRepository keyValueRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restKeyValueMockMvc;

    private KeyValue keyValue;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyValueResource keyValueResource = new KeyValueResource(keyValueRepository);
        this.restKeyValueMockMvc = MockMvcBuilders.standaloneSetup(keyValueResource)
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
    public static KeyValue createEntity() {
        KeyValue keyValue = new KeyValue();
        return keyValue;
    }

    @Before
    public void initTest() {
        keyValueRepository.deleteAll();
        keyValue = createEntity();
    }

    @Test
    public void createKeyValue() throws Exception {
        int databaseSizeBeforeCreate = keyValueRepository.findAll().size();

        // Create the KeyValue
        restKeyValueMockMvc.perform(post("/api/key-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyValue)))
            .andExpect(status().isCreated());

        // Validate the KeyValue in the database
        List<KeyValue> keyValueList = keyValueRepository.findAll();
        assertThat(keyValueList).hasSize(databaseSizeBeforeCreate + 1);
        KeyValue testKeyValue = keyValueList.get(keyValueList.size() - 1);
    }

    @Test
    public void createKeyValueWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyValueRepository.findAll().size();

        // Create the KeyValue with an existing ID
        keyValue.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyValueMockMvc.perform(post("/api/key-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyValue)))
            .andExpect(status().isBadRequest());

        // Validate the KeyValue in the database
        List<KeyValue> keyValueList = keyValueRepository.findAll();
        assertThat(keyValueList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllKeyValues() throws Exception {
        // Initialize the database
        keyValueRepository.save(keyValue);

        // Get all the keyValueList
        restKeyValueMockMvc.perform(get("/api/key-values?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(keyValue.getId())));
    }

    @Test
    public void getKeyValue() throws Exception {
        // Initialize the database
        keyValueRepository.save(keyValue);

        // Get the keyValue
        restKeyValueMockMvc.perform(get("/api/key-values/{id}", keyValue.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(keyValue.getId()));
    }

    @Test
    public void getNonExistingKeyValue() throws Exception {
        // Get the keyValue
        restKeyValueMockMvc.perform(get("/api/key-values/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateKeyValue() throws Exception {
        // Initialize the database
        keyValueRepository.save(keyValue);
        int databaseSizeBeforeUpdate = keyValueRepository.findAll().size();

        // Update the keyValue
        KeyValue updatedKeyValue = keyValueRepository.findOne(keyValue.getId());

        restKeyValueMockMvc.perform(put("/api/key-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKeyValue)))
            .andExpect(status().isOk());

        // Validate the KeyValue in the database
        List<KeyValue> keyValueList = keyValueRepository.findAll();
        assertThat(keyValueList).hasSize(databaseSizeBeforeUpdate);
        KeyValue testKeyValue = keyValueList.get(keyValueList.size() - 1);
    }

    @Test
    public void updateNonExistingKeyValue() throws Exception {
        int databaseSizeBeforeUpdate = keyValueRepository.findAll().size();

        // Create the KeyValue

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKeyValueMockMvc.perform(put("/api/key-values")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(keyValue)))
            .andExpect(status().isCreated());

        // Validate the KeyValue in the database
        List<KeyValue> keyValueList = keyValueRepository.findAll();
        assertThat(keyValueList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteKeyValue() throws Exception {
        // Initialize the database
        keyValueRepository.save(keyValue);
        int databaseSizeBeforeDelete = keyValueRepository.findAll().size();

        // Get the keyValue
        restKeyValueMockMvc.perform(delete("/api/key-values/{id}", keyValue.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<KeyValue> keyValueList = keyValueRepository.findAll();
        assertThat(keyValueList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KeyValue.class);
        KeyValue keyValue1 = new KeyValue();
        keyValue1.setId("id1");
        KeyValue keyValue2 = new KeyValue();
        keyValue2.setId(keyValue1.getId());
        assertThat(keyValue1).isEqualTo(keyValue2);
        keyValue2.setId("id2");
        assertThat(keyValue1).isNotEqualTo(keyValue2);
        keyValue1.setId(null);
        assertThat(keyValue1).isNotEqualTo(keyValue2);
    }
}
