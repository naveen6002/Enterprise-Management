package com.example.backend.controller.health;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.Map;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class DatabaseHealthController {

    private final DataSource customerDS;
    private final DataSource commissionDS;
    private final DataSource dcaDS;
    private final DataSource paymentDS;
    private final DataSource sopDS;

    public DatabaseHealthController(
            @Qualifier("customerDataSource") DataSource customerDS,
            @Qualifier("commissionDataSource") DataSource commissionDS,
            @Qualifier("dcaDataSource") DataSource dcaDS,
            @Qualifier("paymentDataSource") DataSource paymentDS,
            @Qualifier("sopDataSource") DataSource sopDS) {

        this.customerDS = customerDS;
        this.commissionDS = commissionDS;
        this.dcaDS = dcaDS;
        this.paymentDS = paymentDS;
        this.sopDS = sopDS;
    }

    @GetMapping("/customer")
    public ResponseEntity<?> customerHealth() {
        return check("CUSTOMER_DB", customerDS);
    }

    @GetMapping("/commission")
    public ResponseEntity<?> commissionHealth() {
        return check("COMMISSION_DB", commissionDS);
    }

    @GetMapping("/dca")
    public ResponseEntity<?> dcaHealth() {
        return check("DCA_DB", dcaDS);
    }

    @GetMapping("/payment")
    public ResponseEntity<?> paymentHealth() {
        return check("PAYMENT_DB", paymentDS);
    }

    @GetMapping("/sop")
    public ResponseEntity<?> sopHealth() {
        return check("SOP_DB", sopDS);
    }

    private ResponseEntity<?> check(String dbName, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {
            return ResponseEntity.ok(
                    Map.of(
                            "database", dbName,
                            "status", "UP"
                    )
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.SERVICE_UNAVAILABLE)
                    .body(
                            Map.of(
                                    "database", dbName,
                                    "status", "DOWN",
                                    "error", e.getMessage()
                            )
                    );
        }
    }
}
