package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.Key;
import com.alliancedata.configuration.repository.KeyRepository;
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
 * Test class for the KeyResource REST controller.
 *
 * @see KeyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class KeyResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private KeyRepository keyRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restKeyMockMvc;

    private Key key;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KeyResource keyResource = new KeyResource(keyRepository);
        this.restKeyMockMvc = MockMvcBuilders.standaloneSetup(keyResource)
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
    public static Key createEntity() {
        Key key = new Key()
            .name(DEFAULT_NAME);
        return key;
    }

    @Before
    public void initTest() {
        keyRepository.deleteAll();
        key = createEntity();
    }

    @Test
    public void createKey() throws Exception {
        int databaseSizeBeforeCreate = keyRepository.findAll().size();

        // Create the Key
        restKeyMockMvc.perform(post("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isCreated());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeCreate + 1);
        Key testKey = keyList.get(keyList.size() - 1);
        assertThat(testKey.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createKeyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = keyRepository.findAll().size();

        // Create the Key with an existing ID
        key.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restKeyMockMvc.perform(post("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isBadRequest());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = keyRepository.findAll().size();
        // set the field null
        key.setName(null);

        // Create the Key, which fails.

        restKeyMockMvc.perform(post("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isBadRequest());

        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllKeys() throws Exception {
        // Initialize the database
        keyRepository.save(key);

        // Get all the keyList
        restKeyMockMvc.perform(get("/api/keys?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(key.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    public void getKey() throws Exception {
        // Initialize the database
        keyRepository.save(key);

        // Get the key
        restKeyMockMvc.perform(get("/api/keys/{id}", key.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(key.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    public void getNonExistingKey() throws Exception {
        // Get the key
        restKeyMockMvc.perform(get("/api/keys/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateKey() throws Exception {
        // Initialize the database
        keyRepository.save(key);
        int databaseSizeBeforeUpdate = keyRepository.findAll().size();

        // Update the key
        Key updatedKey = keyRepository.findOne(key.getId());
        updatedKey
            .name(UPDATED_NAME);

        restKeyMockMvc.perform(put("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedKey)))
            .andExpect(status().isOk());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeUpdate);
        Key testKey = keyList.get(keyList.size() - 1);
        assertThat(testKey.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingKey() throws Exception {
        int databaseSizeBeforeUpdate = keyRepository.findAll().size();

        // Create the Key

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKeyMockMvc.perform(put("/api/keys")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(key)))
            .andExpect(status().isCreated());

        // Validate the Key in the database
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteKey() throws Exception {
        // Initialize the database
        keyRepository.save(key);
        int databaseSizeBeforeDelete = keyRepository.findAll().size();

        // Get the key
        restKeyMockMvc.perform(delete("/api/keys/{id}", key.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Key> keyList = keyRepository.findAll();
        assertThat(keyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Key.class);
        Key key1 = new Key();
        key1.setId("id1");
        Key key2 = new Key();
        key2.setId(key1.getId());
        assertThat(key1).isEqualTo(key2);
        key2.setId("id2");
        assertThat(key1).isNotEqualTo(key2);
        key1.setId(null);
        assertThat(key1).isNotEqualTo(key2);
    }
}
