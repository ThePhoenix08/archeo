package com.archeo.server.modules.user.dtos;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateOrganizationProfileRequest {


    @NotBlank(message = "Organization name is required")
    @Size(max = 100, message = "Organization name must be at most 100 characters")
    private String organizationName;

    @Size(max = 50, message = "Organization type must be at most 50 characters")
    private String organizationType;

    @NotEmpty(message = "At least one domain must be specified")
    private List<@NotBlank(message = "Domain cannot be blank") String> organizationDomains;

    @Size(max = 100, message = "Contact name must be at most 100 characters")
    private String contactName;

    @Email(message = "Invalid contact email format")
    @Size(max = 100, message = "Contact email must be at most 100 characters")
    private String contactEmail;

    @Pattern(regexp = "^\\+?[0-9\\-\\s]{7,20}$", message = "Invalid contact phone number")
    private String contactPhone;

    private String identityProof;

    @Size(max = 255, message = "Website URL must be at most 255 characters")
    private String webUrl;

    @Size(max = 1000, message = "Address must be at most 1000 characters")
    private String address;


    @Size(max = 255, message = "Avatar URL must be at most 255 characters")
    private String avatarUrl;

    @Size(max = 1000, message = "Bio must be at most 1000 characters")
    private String bio;

}
