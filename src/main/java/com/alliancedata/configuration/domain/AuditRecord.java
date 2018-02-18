package com.alliancedata.configuration.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A AuditRecord.
 */
@Document(collection = "audit_record")
public class AuditRecord implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("what")
    private String what;

    @NotNull
    @Field("when")
    private LocalDate when;

    @NotNull
    @Field("why")
    private String why;

    @NotNull
    @Field("where")
    private String where;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWhat() {
        return what;
    }

    public AuditRecord what(String what) {
        this.what = what;
        return this;
    }

    public void setWhat(String what) {
        this.what = what;
    }

    public LocalDate getWhen() {
        return when;
    }

    public AuditRecord when(LocalDate when) {
        this.when = when;
        return this;
    }

    public void setWhen(LocalDate when) {
        this.when = when;
    }

    public String getWhy() {
        return why;
    }

    public AuditRecord why(String why) {
        this.why = why;
        return this;
    }

    public void setWhy(String why) {
        this.why = why;
    }

    public String getWhere() {
        return where;
    }

    public AuditRecord where(String where) {
        this.where = where;
        return this;
    }

    public void setWhere(String where) {
        this.where = where;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AuditRecord auditRecord = (AuditRecord) o;
        if (auditRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), auditRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AuditRecord{" +
            "id=" + getId() +
            ", what='" + getWhat() + "'" +
            ", when='" + getWhen() + "'" +
            ", why='" + getWhy() + "'" +
            ", where='" + getWhere() + "'" +
            "}";
    }
}
