package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.auth.dtos.OrganizationInfo;
import com.archeo.server.modules.auth.requests.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.responses.OrganizationRegisterResponse;
import com.archeo.server.modules.user.models.Organization;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "agent", ignore = true)
    @Mapping(target = "agentRole", source = "roles")
    void mapRequestToOrganization(@MappingTarget Organization organization,
                                  OrganizationRegisterRequest request);


    default OrganizationRegisterResponse toOrganizationRegisterResponse(Organization organization) {
        OrganizationInfo info = toOrganizationInfo(organization);
        return OrganizationRegisterResponse.builder()
                .agentType("organization")
                .user(info)
                .build();
    }

    @Mapping(source = "id", target = "orgId")
    @Mapping(source = "agent.username", target = "username")
    @Mapping(source = "agent.email", target = "email")
    @Mapping(source = "agentRole", target="roles")
    @Mapping(source = "agent.createdAt", target = "createdAt")
    OrganizationInfo toOrganizationInfo(Organization organization);


}
