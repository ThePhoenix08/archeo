package com.archeo.server.modules.user.mapper;


import com.archeo.server.modules.user.dtos.OrganizationProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateOrganizationProfileRequest;
import com.archeo.server.modules.user.models.Organization;
import com.archeo.server.modules.user.models.Owner;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface OrganizationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updatedOrgFromUpdateOrgRequest(UpdateOrganizationProfileRequest organizationProfileRequest
    , @MappingTarget Organization organization);

    void getOrgDtoFromOrganization(Owner owner, @MappingTarget OrganizationProfileDTO organizationProfileDTO);


}
