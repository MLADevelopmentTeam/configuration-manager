package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.Version;
import com.alliancedata.configuration.repository.VersionRepository;
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
 * Test class for the VersionResource REST controller.
 *
 * @see VersionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class VersionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private VersionRepository versionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restVersionMockMvc;

    private Version version;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VersionResource versionResource = new VersionResource(versionRepository);
        this.restVersionMockMvc = MockMvcBuilders.standaloneSetup(versionResource)
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
    public static Version createEntity() {
        Version version = new Version()
            .name(DEFAULT_NAME);
        return version;
    }

    @Before
    public void initTest() {
        versionRepository.deleteAll();
        version = createEntity();
    }

    @Test
    public void createVersion() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isCreated());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate + 1);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = versionRepository.findAll().size();

        // Create the Version with an existing ID
        version.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = versionRepository.findAll().size();
        // set the field null
        version.setName(null);

        // Create the Version, which fails.

        restVersionMockMvc.perform(post("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isBadRequest());

        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllVersions() throws Exception {
        // Initialize the database
        versionRepository.save(version);

        // Get all the versionList
        restVersionMockMvc.perform(get("/api/versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(version.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    public void getVersion() throws Exception {
        // Initialize the database
        versionRepository.save(version);

        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", version.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(version.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    public void getNonExistingVersion() throws Exception {
        // Get the version
        restVersionMockMvc.perform(get("/api/versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateVersion() throws Exception {
        // Initialize the database
        versionRepository.save(version);
        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Update the version
        Version updatedVersion = versionRepository.findOne(version.getId());
        updatedVersion
            .name(UPDATED_NAME);

        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVersion)))
            .andExpect(status().isOk());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate);
        Version testVersion = versionList.get(versionList.size() - 1);
        assertThat(testVersion.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingVersion() throws Exception {
        int databaseSizeBeforeUpdate = versionRepository.findAll().size();

        // Create the Version

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVersionMockMvc.perform(put("/api/versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(version)))
            .andExpect(status().isCreated());

        // Validate the Version in the database
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteVersion() throws Exception {
        // Initialize the database
        versionRepository.save(version);
        int databaseSizeBeforeDelete = versionRepository.findAll().size();

        // Get the version
        restVersionMockMvc.perform(delete("/api/versions/{id}", version.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Version> versionList = versionRepository.findAll();
        assertThat(versionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Version.class);
        Version version1 = new Version();
        version1.setId("id1");
        Version version2 = new Version();
        version2.setId(version1.getId());
        assertThat(version1).isEqualTo(version2);
        version2.setId("id2");
        assertThat(version1).isNotEqualTo(version2);
        version1.setId(null);
        assertThat(version1).isNotEqualTo(version2);
    }
}
