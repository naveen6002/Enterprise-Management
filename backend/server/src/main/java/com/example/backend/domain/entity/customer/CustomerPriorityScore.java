package com.example.backend.domain.entity.customer;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Table(name = "Customer_Priority_Score")
public class CustomerPriorityScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "priority_id", nullable = false, updatable = false)
    private Long priorityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(name = "score", nullable = false)
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

    // ---------- Getters & Setters ----------

    public Long getPriorityId() {
        return priorityId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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
