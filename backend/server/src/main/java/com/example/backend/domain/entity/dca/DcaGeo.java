package com.example.backend.domain.entity.dca;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name = "DCA_Geo")
public class DcaGeo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "geo_id", nullable = false, updatable = false)
    private Long geoId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dca_id", nullable = false)
    private Dca dca;

    @Column(name = "latitude", precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 9, scale = 6)
    private BigDecimal longitude;

    @Column(name = "coverage_region", length = 100)
    private String coverageRegion;

    // Getters & Setters

    public Long getGeoId() {
        return geoId;
    }

    public Dca getDca() {
        return dca;
    }

    public void setDca(Dca dca) {
        this.dca = dca;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getCoverageRegion() {
        return coverageRegion;
    }

    public void setCoverageRegion(String coverageRegion) {
        this.coverageRegion = coverageRegion;
    }
}
