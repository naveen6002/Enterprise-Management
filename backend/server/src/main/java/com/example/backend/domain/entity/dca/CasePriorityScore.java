package com.example.backend.domain.entity.dca;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "Case_Priority_Score")
public class CasePriorityScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "priority_id", nullable = false, updatable = false)
    private Long priorityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    private DcaCase dcaCase;

    @Column(name = "score")
    private Integer score;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "reason", columnDefinition = "json")
    private Map<String, Object> reason;

    @Column(name = "effective_date", nullable = false)
    private LocalDateTime effectiveDate;

    @PrePersist
    protected void onCreate() {
        this.effectiveDate = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getPriorityId() {
        return priorityId;
    }

    public DcaCase getDcaCase() {
        return dcaCase;
    }

    public void setDcaCase(DcaCase dcaCase) {
        this.dcaCase = dcaCase;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Map<String, Object> getReason() {
        return reason;
    }

    public void setReason(Map<String, Object> reason) {
        this.reason = reason;
    }

    public LocalDateTime getEffectiveDate() {
        return effectiveDate;
    }
}
