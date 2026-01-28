package com.example.backend.domain.entity.dca;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "DCA_Action_Log")
public class DcaActionLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "action_id", nullable = false, updatable = false)
    private Long actionId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "case_id", nullable = false)
    private DcaCase dcaCase;

    @Column(name = "sop_id")
    private Long sopId;

    @Column(name = "action_date", nullable = false)
    private LocalDateTime actionDate;

    @Column(name = "outcome", length = 100)
    private String outcome;

    @Column(name = "remarks", columnDefinition = "text")
    private String remarks;

    @Column(name = "action_sla_due_date")
    private LocalDate actionSlaDueDate;

    @Column(name = "sla_breach_flag")
    private Boolean slaBreachFlag;

    @PrePersist
    protected void onCreate() {
        this.actionDate = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getActionId() {
        return actionId;
    }

    public DcaCase getDcaCase() {
        return dcaCase;
    }

    public void setDcaCase(DcaCase dcaCase) {
        this.dcaCase = dcaCase;
    }

    public Long getSopId() {
        return sopId;
    }

    public void setSopId(Long sopId) {
        this.sopId = sopId;
    }

    public LocalDateTime getActionDate() {
        return actionDate;
    }

    public String getOutcome() {
        return outcome;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public LocalDate getActionSlaDueDate() {
        return actionSlaDueDate;
    }

    public void setActionSlaDueDate(LocalDate actionSlaDueDate) {
        this.actionSlaDueDate = actionSlaDueDate;
    }

    public Boolean getSlaBreachFlag() {
        return slaBreachFlag;
    }

    public void setSlaBreachFlag(Boolean slaBreachFlag) {
        this.slaBreachFlag = slaBreachFlag;
    }
}
