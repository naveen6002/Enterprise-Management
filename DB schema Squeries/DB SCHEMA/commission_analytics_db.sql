CREATE DATABASE commission_analytics_db;
USE commission_analytics_db;

CREATE TABLE DCA_Commission (
    commission_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dca_id BIGINT,
    case_id BIGINT,
    payment_id BIGINT,
    recovered_amount DECIMAL(15,2),
    commission_amount DECIMAL(15,2)
) ENGINE=InnoDB;

CREATE TABLE DCA_Performance_Metrics (
    metric_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dca_id BIGINT,
    recovery_rate DECIMAL(5,2),
    avg_resolution_time INT,
    period VARCHAR(20)
) ENGINE=InnoDB;
