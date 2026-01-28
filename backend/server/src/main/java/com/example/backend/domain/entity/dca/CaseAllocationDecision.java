package com.example.backend.domain.entity.dca;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "Case_Allocation_Decision")
public class CaseAllocationDecision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "decision_id", nullable = false, updatable = false)
    private Long decisionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    private DcaCase dcaCase;

    @Column(name = "selected_dca_id")
    private Long selectedDcaId;

    @Column(name = "priority_score")
    private Integer priorityScore;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "reason", columnDefinition = "json")
    private Map<String, Object> reason;

    @Column(name = "decision_time", nullable = false)
    private LocalDateTime decisionTime;

    @PrePersist
    protected void onCreate() {
        this.decisionTime = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getDecisionId() {
        return decisionId;
    }

    public DcaCase getDcaCase() {
        return dcaCase;
    }

    public void setDcaCase(DcaCase dcaCase) {
        this.dcaCase = dcaCase;
    }

    public Long getSelectedDcaId() {
        return selectedDcaId;
    }

    public void setSelectedDcaId(Long selectedDcaId) {
        this.selectedDcaId = selectedDcaId;
    }

    public Integer getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(Integer priorityScore) {
        this.priorityScore = priorityScore;
    }

    public Map<String, Object> getReason() {
        return reason;
    }

    public void setReason(Map<String, Object> reason) {
        this.reason = reason;
    }

    public LocalDateTime getDecisionTime() {
        return decisionTime;
    }
}
