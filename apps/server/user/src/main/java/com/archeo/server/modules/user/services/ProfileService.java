package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.dtos.IndividualProfileDTO;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateIndividualProfileRequest;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.models.Individual;
import org.springframework.stereotype.Service;

@Service
public interface ProfileService {

    OrganizationProfileDTO getOrganizationProfile(String email);

    void updateOrganizationProfile(UpdateOrganizationProfileRequest updateOrganizationProfileRequest, String orgEmail);

    IndividualProfileDTO getIndividualProfile(Agent agent);


    void updateIndividualProfile(String userEmail, UpdateIndividualProfileRequest updateOwnerProfile);
}
