package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.user.dtos.OrganizationRegisterRequest;
import com.archeo.server.modules.user.dtos.OrganizationRegisterResponse;
import com.archeo.server.modules.user.models.Organization;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mapRequestToOrganization(@MappingTarget Organization organization,
                                  OrganizationRegisterRequest request);


    OrganizationRegisterResponse mapToResponse(Organization organization);
}
