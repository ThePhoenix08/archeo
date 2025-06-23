package com.archeo.server.modules.user.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class OrganizationRegisterRequest {

    @NotBlank(message = "Username is mandatory")
    @Size(min = 4, max = 30, message = "Username must be between 4 and 30 characters")
    private String username;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters")
    private String password;

    @NotBlank(message = "Organization name is required")
    @Size(max = 100, message = "Organization name must be under 100 characters")
    private String organizationName;

    @Size(max = 50, message = "Organization type must be under 50 characters")
    private String organizationType;

    @NotEmpty(message = "At least one organization domain must be specified")
    private List<@NotBlank(message = "Domain must not be blank") String> organizationDomains;

    @Size(max = 100, message = "Contact name must be under 100 characters")
    private String contactName;

    @Email(message = "Contact email should be valid")
    @NotBlank(message = "Contact email is required")
    private String contactEmail;

    @Pattern(regexp = "^[0-9\\-\\+]{9,15}$", message = "Phone number must be valid")
    private String contactPhone;

    @Size(max = 255, message = "Identity proof URL or ID must be under 255 characters")
    private String identityProof;

    @Size(max = 500, message = "Address must be under 500 characters")
    private String address;
}
