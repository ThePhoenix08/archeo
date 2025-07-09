package com.archeo.server.modules.user.services.serviceImpl;

import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.common.repositories.AgentRepository;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.OwnerProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.dtos.UpdateOwnerProfileRequest;
import com.archeo.server.modules.user.mapper.OrgProfileMapper;
import com.archeo.server.modules.user.mapper.OwnerProfileMapper;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import com.archeo.server.modules.user.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {


    private final AgentRepository agentRepository;
    private final OwnerRepo ownerRepo;
    private final OwnerProfileMapper ownerMapper;
    private final OrgProfileMapper organizationMapper;
    private final OrganizationRepo organizationRepo;




    @Override
    public OwnerProfileDTO getOwnerProfile(Agent agent) {

        Owner existingOwner= (Owner) ownerRepo.findByUser(agent)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));


        OwnerProfileDTO ownerProfile=new OwnerProfileDTO();

//        ownerProfile.setUsername(user.getUsername());
//        ownerProfile.setEmail(user.getEmail());

        ownerMapper.getOwnerDTOFromOwner(existingOwner, ownerProfile);

        return ownerProfile;
    }

    @Override
    public void updateOwnerProfile(String userEmail, UpdateOwnerProfileRequest updateOwnerProfile) {

//        Optional<UsersCommon> userToUpdate= Optional.ofNullable(usersCommonRepository.findByEmail(userEmail)
//                .orElseThrow(() -> new UserNotFoundException("User not found")));

        Owner ownerToUpdate= (Owner) ownerRepo.findByUserEmail(userEmail)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        ownerMapper.updateOwnerFromDto(updateOwnerProfile, ownerToUpdate);

        ownerRepo.save(ownerToUpdate);


    }

    @Override
    public OrganizationProfileDTO getOrganizationProfile(String email) {

        Organization existingOrg = organizationRepo.findByUserEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        OrganizationProfileDTO organizationProfileDTO=new OrganizationProfileDTO();
        organizationMapper.getOrgDtoFromOrganization(existingOrg, organizationProfileDTO);

        return  organizationProfileDTO;
    }

    @Override
    public void updateOrganizationProfile(UpdateOrganizationProfileRequest updateOrganizationProfileRequest, String orgEmail) {

        Organization orgToUpdate = organizationRepo.findByUserEmail(orgEmail)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        organizationMapper.updateOrgFromUpdateOrgRequest(updateOrganizationProfileRequest, orgToUpdate);
        organizationRepo.save(orgToUpdate);
    }

}
