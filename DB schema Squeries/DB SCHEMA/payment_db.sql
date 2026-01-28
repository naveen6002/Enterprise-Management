CREATE DATABASE payment_db;
USE payment_db;

CREATE TABLE Invoice (
    invoice_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    invoice_amount DECIMAL(15,2),
    outstanding_amount DECIMAL(15,2),
    invoice_date DATE,
    due_date DATE,
    status ENUM('Open','Paid','Partial')
) ENGINE=InnoDB;


CREATE TABLE Payment (
    payment_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    invoice_id BIGINT NOT NULL,
    payment_amount DECIMAL(15,2),
    payment_date DATE,
    payment_source ENUM('Customer','DCA'),
    FOREIGN KEY (invoice_id) REFERENCES Invoice(invoice_id)
) ENGINE=InnoDB;
