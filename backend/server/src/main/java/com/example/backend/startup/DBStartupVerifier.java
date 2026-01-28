package com.example.backend.startup;

import javax.sql.DataSource;
import java.sql.Connection;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DBStartupVerifier {

    @Bean
    CommandLineRunner verifyDatabases(
            @Qualifier("customerDataSource") DataSource customerDS,
            @Qualifier("commissionDataSource") DataSource commissionDS,
            @Qualifier("dcaDataSource") DataSource dcaDS,
            @Qualifier("paymentDataSource") DataSource paymentDS,
            @Qualifier("sopDataSource") DataSource sopDS
    ) {
        return args -> {
            testConnection("CUSTOMER_DB", customerDS);
            testConnection("COMMISSION_DB", commissionDS);
            testConnection("DCA_DB", dcaDS);
            testConnection("PAYMENT_DB", paymentDS);
            testConnection("SOP_DB", sopDS);
        };
    }

    private void testConnection(String dbName, DataSource dataSource) {
        try (Connection conn = dataSource.getConnection()) {
            System.out.println("✅ Connected to " + dbName);
        } catch (Exception e) {
            System.err.println("❌ FAILED to connect to " + dbName);
            throw new RuntimeException("Database connection failed for " + dbName, e);
        }
    }
}
