package com.archeo.server.modules.common.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.Getter;

import java.util.Arrays;

@Getter
public enum ProofDocumentType {

    GST_CERTIFICATE("GST Certificate"),
    COMPANY_INCORPORATION_CERTIFICATE("Company Incorporation Certificate"),
    ORGANIZATION_PAN_CARD("Organization PAN Card"),
    UDYAM_MSME_CERTIFICATE("Udyam / MSME Certificate"),
    NGO_REGISTRATION_CERTIFICATE("NGO Registration Certificate"),
    GOVERNMENT_ISSUANCE_LETTER("Government Issuance Letter"),
    OPERATIONAL_LICENSE("Operational License"),
    TAX_REGISTRATION_DOCUMENT("Tax Registration Document"),
    MOU_WITH_GOVERNMENT_BODY("MOU with Government Body"),
    REGULATORY_REGISTRATION_CERTIFICATE("Regulatory Registration Certificate"),
    INSURANCE_CERTIFICATE("Insurance Certificate"),
    LETTER_OF_CONSENT_AUTHORIZATION("Letter of Consent / Authorization"),
    IDENTITY_PROOF_AUTHORIZED_SIGNATORY("Identity Proof of Authorized Signatory"),
    ADDRESS_PROOF("Address Proof (Utility Bill, Rent Agreement)"),
    BUSINESS_REGISTRATION_NUMBER_PROOF("Business Registration Number Proof");

    private final String value;

    ProofDocumentType(String value) {
        this.value = value;
    }

    @JsonValue
    public String toValue() {
        return this.value;
    }

    @JsonCreator
    public static ProofDocumentType fromValue(String input) {
        return Arrays.stream(ProofDocumentType.values())
                .filter(type -> type.value.equalsIgnoreCase(input))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid proof document type: " + input));
    }
}
