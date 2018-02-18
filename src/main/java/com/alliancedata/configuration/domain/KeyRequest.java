package com.alliancedata.configuration.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A KeyRequest.
 */
@Document(collection = "key_request")
public class KeyRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @Field("closed_date")
    private LocalDate closedDate;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getClosedDate() {
        return closedDate;
    }

    public KeyRequest closedDate(LocalDate closedDate) {
        this.closedDate = closedDate;
        return this;
    }

    public void setClosedDate(LocalDate closedDate) {
        this.closedDate = closedDate;
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
        KeyRequest keyRequest = (KeyRequest) o;
        if (keyRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), keyRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KeyRequest{" +
            "id=" + getId() +
            ", closedDate='" + getClosedDate() + "'" +
            "}";
    }
}
