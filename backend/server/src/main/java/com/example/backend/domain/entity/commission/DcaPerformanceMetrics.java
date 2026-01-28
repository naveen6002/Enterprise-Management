package com.example.backend.domain.entity.commission;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "DCA_Performance_Metrics")
public class DcaPerformanceMetrics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id", nullable = false, updatable = false)
    private Long metricId;

    @Column(name = "dca_id")
    private Long dcaId;

    @Column(name = "recovery_rate", precision = 5, scale = 2)
    private BigDecimal recoveryRate;

    @Column(name = "avg_resolution_time")
    private Integer avgResolutionTime;

    @Column(name = "period", length = 20)
    private String period;

    // ---------- Getters & Setters ----------

    public Long getMetricId() {
        return metricId;
    }

    public Long getDcaId() {
        return dcaId;
    }

    public void setDcaId(Long dcaId) {
        this.dcaId = dcaId;
    }

    public BigDecimal getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(BigDecimal recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public Integer getAvgResolutionTime() {
        return avgResolutionTime;
    }

    public void setAvgResolutionTime(Integer avgResolutionTime) {
        this.avgResolutionTime = avgResolutionTime;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }
}
