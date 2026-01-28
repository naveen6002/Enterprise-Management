CREATE USER 'app_user'@'%' IDENTIFIED BY 'StrongPassword123';


GRANT ALL PRIVILEGES ON customer_db.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON dca_case_db.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON payment_db.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON sop_sla_db.* TO 'app_user'@'%';
GRANT ALL PRIVILEGES ON commission_analytics_db.* TO 'app_user'@'%';

FLUSH PRIVILEGES;
