package com.archeo.server.modules.user.mapper;


import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.models.Organization;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrgProfileMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateOrgFromUpdateOrgRequest(UpdateOrganizationProfileRequest organizationProfileRequest
    , @MappingTarget Organization organization);

    void getOrgDtoFromOrganization(Organization organization, @MappingTarget OrganizationProfileDTO organizationProfileDTO);


}
