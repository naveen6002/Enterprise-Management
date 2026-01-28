CREATE DATABASE sop_sla_db;
USE sop_sla_db;

CREATE TABLE SOP_Rule (
    sop_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    action_type ENUM('Call','Visit','Email'),
    description VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE Case_SLA_Rule (
    case_sla_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    collection_stage ENUM('Pre_DCA','Active','Legal'),
    max_resolution_days INT,
    severity ENUM('Low','Medium','High')
) ENGINE=InnoDB;

CREATE TABLE Action_SLA_Rule (
    action_sla_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    action_type ENUM('Call','Visit','Email'),
    max_days_allowed INT,
    mandatory_flag BOOLEAN
) ENGINE=InnoDB;


CREATE TABLE SOP_Action_SLA_Map (
    map_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sop_id BIGINT,
    action_sla_id BIGINT,
    collection_stage ENUM('Pre_DCA','Active','Legal'),
    FOREIGN KEY (sop_id) REFERENCES SOP_Rule(sop_id),
    FOREIGN KEY (action_sla_id) REFERENCES Action_SLA_Rule(action_sla_id)
) ENGINE=InnoDB;

