package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.common.models.UsersCommon;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface UsersCommonMapper{

    @Mappings({
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "username", source = "username"),
            @Mapping(target = "password", source = "password"),
            @Mapping(target = "userRole", constant = "ROLE_OWNER"),
    })
    void ownerToUsersCommon(OwnerRegisterRequest owner,
                            @MappingTarget UsersCommon usersCommon);

    @Mappings({
            @Mapping(target = "email", source = "email"),
            @Mapping(target = "username", source = "username"),
            @Mapping(target = "password", source = "password"),
            @Mapping(target = "userRole", constant = "ROLE_ISSUER"),
    })
    void organizationToUsersCommon(OrganizationRegisterRequest organization,
                                   @MappingTarget UsersCommon usersCommon);
}
