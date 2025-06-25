package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.auth.dtos.OwnerRegisterRequest;
import com.archeo.server.modules.user.models.Owner;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface OwnerMapper {


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void mapOwnerRegisterRequestToOwner(OwnerRegisterRequest ownerRegisterRequest,
                                        @MappingTarget Owner owner);
}
