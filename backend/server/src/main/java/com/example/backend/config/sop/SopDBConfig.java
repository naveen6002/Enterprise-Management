package com.example.backend.config.sop;

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
        basePackages = "com.example.backend.repository.sop",
        entityManagerFactoryRef = "sopEntityManagerFactory",
        transactionManagerRef = "sopTransactionManager"
)
public class SopDBConfig {

    @Bean
    @ConfigurationProperties(prefix = "sop.datasource")
    public DataSource sopDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean sopEntityManagerFactory(
            EntityManagerFactoryBuilder builder) {

        return builder
                .dataSource(sopDataSource())
                .packages("com.example.backend.domain.entity.sop")
                .persistenceUnit("sopPU")
                .build();
    }

    @Bean
    public PlatformTransactionManager sopTransactionManager(
            @Qualifier("sopEntityManagerFactory") EntityManagerFactory emf) {

        return new JpaTransactionManager(emf);
    }
}
