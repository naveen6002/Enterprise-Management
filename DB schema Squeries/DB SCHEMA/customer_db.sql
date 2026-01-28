CREATE DATABASE customer_db;
USE customer_db;

CREATE TABLE Customer (
    customer_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(150) NOT NULL,
    customer_type ENUM('Individual','SME','Enterprise') NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(150),
    date_of_birth DATE,
    industry VARCHAR(100),
    country VARCHAR(50),
    status ENUM('Active','In_Collections','Closed') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE Customer_Account (
    account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    credit_limit DECIMAL(15,2),
    outstanding_amount DECIMAL(15,2),
    ageing_bucket ENUM('0-30','31-60','61-90','90+'),
    risk_segment ENUM('Low','Medium','High'),
    delinquency_score INT,
    collection_stage ENUM('Pre_DCA','Active','Legal'),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
) ENGINE=InnoDB;

CREATE TABLE Account_Address (
    address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    address_line VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(50),
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    FOREIGN KEY (account_id) REFERENCES Customer_Account(account_id)
) ENGINE=InnoDB;

CREATE TABLE Customer_Priority_Score (
    priority_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    customer_id BIGINT NOT NULL,
    score INT NOT NULL,
    reason JSON,
    effective_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
) ENGINE=InnoDB;
