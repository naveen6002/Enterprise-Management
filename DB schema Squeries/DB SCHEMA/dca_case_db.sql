CREATE DATABASE dca_case_db;
USE dca_case_db;

CREATE TABLE DCA (
    dca_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dca_name VARCHAR(150),
    commission_rate DECIMAL(5,2),
    status ENUM('Active','Suspended')
) ENGINE=InnoDB;

CREATE TABLE DCA_Geo (
    geo_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dca_id BIGINT NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    coverage_region VARCHAR(100),
    FOREIGN KEY (dca_id) REFERENCES DCA(dca_id)
) ENGINE=InnoDB;

CREATE TABLE DCA_Capacity (
    capacity_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    dca_id BIGINT NOT NULL,
    month DATE,
    max_cases INT,
    allocated_cases INT,
    FOREIGN KEY (dca_id) REFERENCES DCA(dca_id)
) ENGINE=InnoDB;

CREATE TABLE DCA_Case (
    case_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    dca_id BIGINT NOT NULL,
    allocated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    case_status ENUM('Open','Closed'),
    case_sla_id BIGINT,
    case_sla_due_date DATE,
    FOREIGN KEY (dca_id) REFERENCES DCA(dca_id)
) ENGINE=InnoDB;


CREATE TABLE Case_Allocation_Decision (
    decision_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT NOT NULL,
    selected_dca_id BIGINT,
    priority_score INT,
    reason JSON,
    decision_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES DCA_Case(case_id)
) ENGINE=InnoDB;

CREATE TABLE DCA_Action_Log (
    action_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT NOT NULL,
    sop_id BIGINT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    outcome VARCHAR(100),
    remarks TEXT,
    action_sla_due_date DATE,
    sla_breach_flag BOOLEAN,
    FOREIGN KEY (case_id) REFERENCES DCA_Case(case_id)
) ENGINE=InnoDB;

CREATE TABLE Case_Priority_Score (
    priority_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    case_id BIGINT NOT NULL,
    score INT,
    reason JSON,
    effective_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES DCA_Case(case_id)
) ENGINE=InnoDB;
