package com.example.backend.domain.entity.dca;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "DCA_Capacity")
public class DcaCapacity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "capacity_id", nullable = false, updatable = false)
    private Long capacityId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dca_id", nullable = false)
    private Dca dca;

    @Column(name = "month")
    private LocalDate month;

    @Column(name = "max_cases")
    private Integer maxCases;

    @Column(name = "allocated_cases")
    private Integer allocatedCases;

    // Getters & Setters

    public Long getCapacityId() {
        return capacityId;
    }

    public Dca getDca() {
        return dca;
    }

    public void setDca(Dca dca) {
        this.dca = dca;
    }

    public LocalDate getMonth() {
        return month;
    }

    public void setMonth(LocalDate month) {
        this.month = month;
    }

    public Integer getMaxCases() {
        return maxCases;
    }

    public void setMaxCases(Integer maxCases) {
        this.maxCases = maxCases;
    }

    public Integer getAllocatedCases() {
        return allocatedCases;
    }

    public void setAllocatedCases(Integer allocatedCases) {
        this.allocatedCases = allocatedCases;
    }
}
