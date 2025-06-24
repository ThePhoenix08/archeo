package com.archeo.server.modules.user.services.serviceImpl;

import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import com.archeo.server.modules.user.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {


    private final UsersCommonRepository usersCommonRepository;
    private final OwnerRepo ownerRepo;


    @Override
    public OrganizationProfileDTO getOrganizationProfile() {
        return null;
    }

    @Override
    public OrganizationProfileDTO updateOrganizationProfile() {
        return null;
    }

    @Override
    public OwnerProfileDTO getOwnerProfile(UsersCommon user) {

        Owner existingOwner= (Owner) ownerRepo.findByUser(user)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));


        OwnerProfileDTO ownerProfile=new OwnerProfileDTO();

        ownerProfile.setUsername(user.getUsername());
        ownerProfile.setEmail(user.getEmail());

        ownerProfile.setFullName(existingOwner.getFullName());
        ownerProfile.setDob(existingOwner.getDob());
        ownerProfile.setPhoneNumber(existingOwner.getPhoneNumber());
        ownerProfile.setDob(existingOwner.getDob());
        ownerProfile.setAddress(ownerProfile.getAddress());
        ownerProfile.setAvatarUrl(ownerProfile.getAvatarUrl());
        return ownerProfile;
    }

    @Override
    public OwnerProfileDTO updateOwnerProfile() {
        return null;
    }
}
