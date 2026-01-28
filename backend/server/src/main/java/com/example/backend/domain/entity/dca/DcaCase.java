package com.example.backend.domain.entity.dca;

import com.example.backend.domain.enums.dca.CaseStatus;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "DCA_Case")
public class DcaCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "case_id", nullable = false, updatable = false)
    private Long caseId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dca_id", nullable = false)
    private Dca dca;

    @Column(name = "allocated_date", nullable = false)
    private LocalDateTime allocatedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "case_status")
    private CaseStatus caseStatus;

    @Column(name = "case_sla_id")
    private Long caseSlaId;

    @Column(name = "case_sla_due_date")
    private LocalDate caseSlaDueDate;

    @PrePersist
    protected void onCreate() {
        this.allocatedDate = LocalDateTime.now();
    }

    // Getters & Setters

    public Long getCaseId() {
        return caseId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Dca getDca() {
        return dca;
    }

    public void setDca(Dca dca) {
        this.dca = dca;
    }

    public LocalDateTime getAllocatedDate() {
        return allocatedDate;
    }

    public CaseStatus getCaseStatus() {
        return caseStatus;
    }

    public void setCaseStatus(CaseStatus caseStatus) {
        this.caseStatus = caseStatus;
    }

    public Long getCaseSlaId() {
        return caseSlaId;
    }

    public void setCaseSlaId(Long caseSlaId) {
        this.caseSlaId = caseSlaId;
    }

    public LocalDate getCaseSlaDueDate() {
        return caseSlaDueDate;
    }

    public void setCaseSlaDueDate(LocalDate caseSlaDueDate) {
        this.caseSlaDueDate = caseSlaDueDate;
    }
}
