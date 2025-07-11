package com.archeo.server.modules.user.services.serviceImpl;

import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.common.exceptions.UserNotFoundException;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.dtos.IndividualProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateIndividualProfileRequest;
import com.archeo.server.modules.user.mapper.IndividualProfileMapper;
import com.archeo.server.modules.user.models.Individual;
import com.archeo.server.modules.user.repositories.AgentRepository;
import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.mapper.OrgProfileMapper;
import com.archeo.server.modules.user.models.Organization;

import com.archeo.server.modules.user.repositories.IndividualRepo;
import com.archeo.server.modules.user.repositories.OrganizationRepo;

import com.archeo.server.modules.user.services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {


    private final AgentRepository agentRepository;
    private final IndividualRepo individualRepo;
    private final IndividualProfileMapper individualProfileMapper;
    private final OrgProfileMapper organizationMapper;
    private final OrganizationRepo organizationRepo;




    @Override
    public IndividualProfileDTO getIndividualProfile(Agent agent) {

        Individual existingIndividual= (Individual)individualRepo.findByAgent(agent)
                .orElseThrow(() -> new InvalidCredentialsException("User not found"));


        IndividualProfileDTO individualProfile=new IndividualProfileDTO();

//        ownerProfile.setUsername(user.getUsername());
//        ownerProfile.setEmail(user.getEmail());

        individualProfileMapper.getIndividualDTOFromIndividual(existingIndividual, individualProfile);

        return individualProfile;
    }

    @Override
    public void updateIndividualProfile(String userEmail, UpdateIndividualProfileRequest updateIndividualProfileRequestProfile) {

//        Optional<UsersCommon> userToUpdate= Optional.ofNullable(usersCommonRepository.findByEmail(userEmail)
//                .orElseThrow(() -> new UserNotFoundException("User not found")));

        Individual individualToUpdate= (Individual) individualRepo.findByAgentEmail(userEmail)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        individualProfileMapper.updateIndividualFromDto(updateIndividualProfileRequestProfile, individualToUpdate);

        individualRepo.save(individualToUpdate);


    }

    @Override
    public OrganizationProfileDTO getOrganizationProfile(String email) {

        Organization existingOrg = organizationRepo.findByAgentEmail(email)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        OrganizationProfileDTO organizationProfileDTO=new OrganizationProfileDTO();
        organizationMapper.getOrgDtoFromOrganization(existingOrg, organizationProfileDTO);

        return  organizationProfileDTO;
    }

    @Override
    public void updateOrganizationProfile(UpdateOrganizationProfileRequest updateOrganizationProfileRequest, String orgEmail) {

        Organization orgToUpdate = organizationRepo.findByAgentEmail(orgEmail)
                .orElseThrow(()-> new UserNotFoundException("User not found"));

        organizationMapper.updateOrgFromUpdateOrgRequest(updateOrganizationProfileRequest, orgToUpdate);
        organizationRepo.save(orgToUpdate);
    }

}
