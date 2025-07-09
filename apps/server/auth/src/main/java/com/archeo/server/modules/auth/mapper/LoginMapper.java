package com.archeo.server.modules.auth.mapper;

import com.archeo.server.modules.auth.dtos.OrganizationLoginResponse;
import com.archeo.server.modules.auth.dtos.OwnerLoginResponse;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LoginMapper {

    @Mapping(source = "agent.username", target = "username")
    @Mapping(source = "agent.email", target = "email")
    OrganizationLoginResponse toDto(Organization organization);

    @Mapping(source = "agent.username", target = "username")
    @Mapping(source = "agent.email", target = "email")
    OwnerLoginResponse toDto(Owner owner);


}
