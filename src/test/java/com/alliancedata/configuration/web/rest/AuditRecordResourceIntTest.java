package com.alliancedata.configuration.web.rest;

import com.alliancedata.configuration.ConfigurationApp;

import com.alliancedata.configuration.domain.AuditRecord;
import com.alliancedata.configuration.repository.AuditRecordRepository;
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
 * Test class for the AuditRecordResource REST controller.
 *
 * @see AuditRecordResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ConfigurationApp.class)
public class AuditRecordResourceIntTest {

    private static final String DEFAULT_WHAT = "AAAAAAAAAA";
    private static final String UPDATED_WHAT = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_WHEN = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_WHEN = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_WHY = "AAAAAAAAAA";
    private static final String UPDATED_WHY = "BBBBBBBBBB";

    private static final String DEFAULT_WHERE = "AAAAAAAAAA";
    private static final String UPDATED_WHERE = "BBBBBBBBBB";

    @Autowired
    private AuditRecordRepository auditRecordRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    private MockMvc restAuditRecordMockMvc;

    private AuditRecord auditRecord;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AuditRecordResource auditRecordResource = new AuditRecordResource(auditRecordRepository);
        this.restAuditRecordMockMvc = MockMvcBuilders.standaloneSetup(auditRecordResource)
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
    public static AuditRecord createEntity() {
        AuditRecord auditRecord = new AuditRecord()
            .what(DEFAULT_WHAT)
            .when(DEFAULT_WHEN)
            .why(DEFAULT_WHY)
            .where(DEFAULT_WHERE);
        return auditRecord;
    }

    @Before
    public void initTest() {
        auditRecordRepository.deleteAll();
        auditRecord = createEntity();
    }

    @Test
    public void createAuditRecord() throws Exception {
        int databaseSizeBeforeCreate = auditRecordRepository.findAll().size();

        // Create the AuditRecord
        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isCreated());

        // Validate the AuditRecord in the database
        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeCreate + 1);
        AuditRecord testAuditRecord = auditRecordList.get(auditRecordList.size() - 1);
        assertThat(testAuditRecord.getWhat()).isEqualTo(DEFAULT_WHAT);
        assertThat(testAuditRecord.getWhen()).isEqualTo(DEFAULT_WHEN);
        assertThat(testAuditRecord.getWhy()).isEqualTo(DEFAULT_WHY);
        assertThat(testAuditRecord.getWhere()).isEqualTo(DEFAULT_WHERE);
    }

    @Test
    public void createAuditRecordWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = auditRecordRepository.findAll().size();

        // Create the AuditRecord with an existing ID
        auditRecord.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isBadRequest());

        // Validate the AuditRecord in the database
        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void checkWhatIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditRecordRepository.findAll().size();
        // set the field null
        auditRecord.setWhat(null);

        // Create the AuditRecord, which fails.

        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isBadRequest());

        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkWhenIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditRecordRepository.findAll().size();
        // set the field null
        auditRecord.setWhen(null);

        // Create the AuditRecord, which fails.

        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isBadRequest());

        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkWhyIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditRecordRepository.findAll().size();
        // set the field null
        auditRecord.setWhy(null);

        // Create the AuditRecord, which fails.

        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isBadRequest());

        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void checkWhereIsRequired() throws Exception {
        int databaseSizeBeforeTest = auditRecordRepository.findAll().size();
        // set the field null
        auditRecord.setWhere(null);

        // Create the AuditRecord, which fails.

        restAuditRecordMockMvc.perform(post("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isBadRequest());

        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllAuditRecords() throws Exception {
        // Initialize the database
        auditRecordRepository.save(auditRecord);

        // Get all the auditRecordList
        restAuditRecordMockMvc.perform(get("/api/audit-records?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auditRecord.getId())))
            .andExpect(jsonPath("$.[*].what").value(hasItem(DEFAULT_WHAT.toString())))
            .andExpect(jsonPath("$.[*].when").value(hasItem(DEFAULT_WHEN.toString())))
            .andExpect(jsonPath("$.[*].why").value(hasItem(DEFAULT_WHY.toString())))
            .andExpect(jsonPath("$.[*].where").value(hasItem(DEFAULT_WHERE.toString())));
    }

    @Test
    public void getAuditRecord() throws Exception {
        // Initialize the database
        auditRecordRepository.save(auditRecord);

        // Get the auditRecord
        restAuditRecordMockMvc.perform(get("/api/audit-records/{id}", auditRecord.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(auditRecord.getId()))
            .andExpect(jsonPath("$.what").value(DEFAULT_WHAT.toString()))
            .andExpect(jsonPath("$.when").value(DEFAULT_WHEN.toString()))
            .andExpect(jsonPath("$.why").value(DEFAULT_WHY.toString()))
            .andExpect(jsonPath("$.where").value(DEFAULT_WHERE.toString()));
    }

    @Test
    public void getNonExistingAuditRecord() throws Exception {
        // Get the auditRecord
        restAuditRecordMockMvc.perform(get("/api/audit-records/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAuditRecord() throws Exception {
        // Initialize the database
        auditRecordRepository.save(auditRecord);
        int databaseSizeBeforeUpdate = auditRecordRepository.findAll().size();

        // Update the auditRecord
        AuditRecord updatedAuditRecord = auditRecordRepository.findOne(auditRecord.getId());
        updatedAuditRecord
            .what(UPDATED_WHAT)
            .when(UPDATED_WHEN)
            .why(UPDATED_WHY)
            .where(UPDATED_WHERE);

        restAuditRecordMockMvc.perform(put("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAuditRecord)))
            .andExpect(status().isOk());

        // Validate the AuditRecord in the database
        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeUpdate);
        AuditRecord testAuditRecord = auditRecordList.get(auditRecordList.size() - 1);
        assertThat(testAuditRecord.getWhat()).isEqualTo(UPDATED_WHAT);
        assertThat(testAuditRecord.getWhen()).isEqualTo(UPDATED_WHEN);
        assertThat(testAuditRecord.getWhy()).isEqualTo(UPDATED_WHY);
        assertThat(testAuditRecord.getWhere()).isEqualTo(UPDATED_WHERE);
    }

    @Test
    public void updateNonExistingAuditRecord() throws Exception {
        int databaseSizeBeforeUpdate = auditRecordRepository.findAll().size();

        // Create the AuditRecord

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAuditRecordMockMvc.perform(put("/api/audit-records")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(auditRecord)))
            .andExpect(status().isCreated());

        // Validate the AuditRecord in the database
        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    public void deleteAuditRecord() throws Exception {
        // Initialize the database
        auditRecordRepository.save(auditRecord);
        int databaseSizeBeforeDelete = auditRecordRepository.findAll().size();

        // Get the auditRecord
        restAuditRecordMockMvc.perform(delete("/api/audit-records/{id}", auditRecord.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AuditRecord> auditRecordList = auditRecordRepository.findAll();
        assertThat(auditRecordList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuditRecord.class);
        AuditRecord auditRecord1 = new AuditRecord();
        auditRecord1.setId("id1");
        AuditRecord auditRecord2 = new AuditRecord();
        auditRecord2.setId(auditRecord1.getId());
        assertThat(auditRecord1).isEqualTo(auditRecord2);
        auditRecord2.setId("id2");
        assertThat(auditRecord1).isNotEqualTo(auditRecord2);
        auditRecord1.setId(null);
        assertThat(auditRecord1).isNotEqualTo(auditRecord2);
    }
}
