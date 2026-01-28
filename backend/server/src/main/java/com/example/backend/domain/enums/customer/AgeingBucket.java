package com.example.backend.domain.enums.customer;

public enum AgeingBucket {

    DAYS_0_30("0-30"),
    DAYS_31_60("31-60"),
    DAYS_61_90("61-90"),
    DAYS_90_PLUS("90+");

    private final String dbValue;

    AgeingBucket(String dbValue) {
        this.dbValue = dbValue;
    }

    public String getDbValue() {
        return dbValue;
    }

    public static AgeingBucket fromDbValue(String dbValue) {
        for (AgeingBucket bucket : values()) {
            if (bucket.dbValue.equals(dbValue)) {
                return bucket;
            }
        }
        throw new IllegalArgumentException("Unknown AgeingBucket DB value: " + dbValue);
    }
}
