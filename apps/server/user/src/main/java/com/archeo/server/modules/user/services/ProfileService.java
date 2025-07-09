package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.dtos.UpdateOwnerProfileRequest;
import org.springframework.stereotype.Service;

@Service
public interface ProfileService {

    OrganizationProfileDTO getOrganizationProfile(String email);

    void updateOrganizationProfile(UpdateOrganizationProfileRequest updateOrganizationProfileRequest, String orgEmail);

    OwnerProfileDTO getOwnerProfile(Agent agent);


    void updateOwnerProfile(String userEmail, UpdateOwnerProfileRequest updateOwnerProfile);
}
