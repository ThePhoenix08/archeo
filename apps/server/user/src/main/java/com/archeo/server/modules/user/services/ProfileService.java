package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import org.springframework.stereotype.Service;

@Service
public interface ProfileService {

    OrganizationProfileDTO getOrganizationProfile();

    OrganizationProfileDTO updateOrganizationProfile();

    OwnerProfileDTO getOwnerProfile(UsersCommon user);

    OwnerProfileDTO updateOwnerProfile();



}
