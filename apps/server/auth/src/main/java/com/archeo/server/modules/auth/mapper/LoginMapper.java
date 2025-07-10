package com.archeo.server.modules.auth.mapper;

import com.archeo.server.modules.auth.dtos.IndividualInfo;
import com.archeo.server.modules.auth.dtos.OrganizationInfo;
import com.archeo.server.modules.user.models.Individual;
import com.archeo.server.modules.user.models.Organization;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LoginMapper {

    // Maps Owner entity to OwnerInfo DTO
    @Mapping(source = "agent.id", target = "userId")
    @Mapping(source = "agent.username", target = "username")
    @Mapping(source = "agent.email", target = "email")
    @Mapping(source="agentRole", target = "roles")
    IndividualInfo toIndividualInfo(Individual individual);

    // Maps Organization entity to OrganizationInfo DTO
    @Mapping(source = "agent.id", target = "orgId")
    @Mapping(source = "agent.username", target = "username")
    @Mapping(source = "agent.email", target = "email")
    @Mapping(source="agentRole", target = "roles")
    OrganizationInfo toOrganizationInfo(Organization organization);
}
