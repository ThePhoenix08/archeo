package com.archeo.server.modules.auth.mapper;

import com.archeo.server.modules.auth.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.user.models.Organization;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mapOrganizationRegisterRequestToOrganization(OrganizationRegisterRequest organizationRegisterRequest
                                                      , @MappingTarget Organization organization);



}
