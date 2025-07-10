package com.archeo.server.modules.user.mapper;

import com.archeo.server.modules.user.dtos.IndividualProfileDTO;
import com.archeo.server.modules.user.dtos.UpdateIndividualProfileRequest;

import com.archeo.server.modules.user.models.Individual;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface IndividualProfileMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "agent", ignore = true)
    void updateIndividualFromDto(UpdateIndividualProfileRequest dto, @MappingTarget Individual individual);


    void getIndividualDTOFromIndividual(Individual individual, @MappingTarget IndividualProfileDTO ownerProfileDTO);
}
