package com.example.backend.domain.entity.commission;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "DCA_Commission")
public class DcaCommission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "commission_id", nullable = false, updatable = false)
    private Long commissionId;

    @Column(name = "dca_id")
    private Long dcaId;

    @Column(name = "case_id")
    private Long caseId;

    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "recovered_amount", precision = 15, scale = 2)
    private BigDecimal recoveredAmount;

    @Column(name = "commission_amount", precision = 15, scale = 2)
    private BigDecimal commissionAmount;

    // ---------- Getters & Setters ----------

    public Long getCommissionId() {
        return commissionId;
    }

    public Long getDcaId() {
        return dcaId;
    }

    public void setDcaId(Long dcaId) {
        this.dcaId = dcaId;
    }

    public Long getCaseId() {
        return caseId;
    }

    public void setCaseId(Long caseId) {
        this.caseId = caseId;
    }

    public Long getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(Long paymentId) {
        this.paymentId = paymentId;
    }

    public BigDecimal getRecoveredAmount() {
        return recoveredAmount;
    }

    public void setRecoveredAmount(BigDecimal recoveredAmount) {
        this.recoveredAmount = recoveredAmount;
    }

    public BigDecimal getCommissionAmount() {
        return commissionAmount;
    }

    public void setCommissionAmount(BigDecimal commissionAmount) {
        this.commissionAmount = commissionAmount;
    }
}
