package com.example.backend.converter.customer;

import com.example.backend.domain.enums.customer.AgeingBucket;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = false)
public class AgeingBucketConverter
        implements AttributeConverter<AgeingBucket, String> {

    @Override
    public String convertToDatabaseColumn(AgeingBucket attribute) {
        return attribute == null ? null : attribute.getDbValue();
    }

    @Override
    public AgeingBucket convertToEntityAttribute(String dbData) {
        return dbData == null ? null : AgeingBucket.fromDbValue(dbData);
    }
}
