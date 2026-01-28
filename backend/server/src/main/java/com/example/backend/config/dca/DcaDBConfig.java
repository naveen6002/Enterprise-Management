package com.example.backend.config.dca;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.example.backend.repository.dca",
        entityManagerFactoryRef = "dcaEntityManagerFactory",
        transactionManagerRef = "dcaTransactionManager"
)
public class DcaDBConfig {

    @Bean
    @ConfigurationProperties(prefix = "dca.datasource")
    public DataSource dcaDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean dcaEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {

        return builder
                .dataSource(dcaDataSource())
                .packages("com.example.backend.domain.entity.dca")
                .persistenceUnit("dcaPU")
                .build();
    }

    @Bean
    public PlatformTransactionManager dcaTransactionManager(
            @Qualifier("dcaEntityManagerFactory") EntityManagerFactory emf) {

        return new JpaTransactionManager(emf);
    }
}
