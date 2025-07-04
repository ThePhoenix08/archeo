package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.auth.dtos.OwnerRegisterResponse;
import com.archeo.server.modules.user.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.user.models.Owner;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OwnerMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "user", ignore = true)
    @Mapping(target = "userRole", source = "userRole")  // Add this line
    void mapOwnerRegisterRequestToOwner(OwnerRegisterRequest request, @MappingTarget Owner owner);

    @Mapping(target = "email", source = "user.email")
    OwnerRegisterResponse mapOwnerToResponse(Owner owner);
}
