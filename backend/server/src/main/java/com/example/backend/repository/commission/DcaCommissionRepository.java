package com.example.backend.repository.commission;

import com.example.backend.domain.entity.commission.DcaCommission;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DcaCommissionRepository
        extends JpaRepository<DcaCommission, Long> {
}
