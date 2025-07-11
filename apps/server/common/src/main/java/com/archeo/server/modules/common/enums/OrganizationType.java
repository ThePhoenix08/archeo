package com.archeo.server.modules.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum OrganizationType {

    GOVERNMENT("government"),
    EDUCATIONAL_INSTITUTION("educational institution"),
    COMMERCIAL_ENTITY("commercial entity"),
    NON_GOVERNMENTAL_ORGANIZATION("non-governmental organization"),
    HOSPITAL_MEDICAL_INSTITUTION("hospital / medical institution"),
    FINANCIAL_INSTITUTION("financial institution"),
    LEGAL_JUDICIAL_AUTHORITY("legal / judicial authority"),
    RESEARCH_DEVELOPMENT_BODY("research & development body"),
    REGULATORY_AUTHORITY("regulatory authority"),
    MILITARY_DEFENSE("military / defense"),
    EMBASSY_DIPLOMATIC_MISSION("embassy / diplomatic mission"),
    ACCREDITED_LAB_TESTING_FACILITY("accredited lab / testing facility"),
    UTILITY_INFRASTRUCTURE_PROVIDER("utility / infrastructure provider"),
    TRAINING_CERTIFICATION_BODY("training & certification body");

    private final String value;

    OrganizationType(String value) {
        this.value = value;
    }

    @JsonValue
    public String toValue() {
        return this.value;
    }

    @JsonCreator
    public static OrganizationType fromValue(String input) {
        return Arrays.stream(OrganizationType.values())
                .filter(type -> type.value.equalsIgnoreCase(input))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid organization type: " + input));
    }
}
