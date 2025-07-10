package com.archeo.server.modules.auth.mapper;


import com.archeo.server.modules.auth.dtos.IndividualInfo;
import com.archeo.server.modules.auth.requests.IndividualRegisterRequest;
import com.archeo.server.modules.user.models.Individual;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface IndividualMapper {

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "agent", ignore = true)
    @Mapping(target = "agentRole", source = "agentRole")
    void mapIndividualRegisterRequestToIndividual(IndividualRegisterRequest request, @MappingTarget Individual individual);

    @Mapping(target = "userId", source = "id")
    @Mapping(target = "username", source = "agent.username")
    @Mapping(target = "email", source = "agent.email")
    @Mapping(target = "createdAt", source = "createdAt", dateFormat = "yyyy-MM-dd'T'HH:mm:ss")
//    @Mapping(target = "lastLoginAt", source = "agent.lastLoginAt", dateFormat = "yyyy-MM-dd'T'HH:mm:ss")
    @Mapping(target = "fullName", source = "fullName")
    @Mapping(target = "dateOfBirth", source = "dateOfBirth", dateFormat = "yyyy-MM-dd")
    @Mapping(target = "gender", source = "gender")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "phone", source = "phoneNumber")
    @Mapping(target = "avatar", source = "avatarUrl")
    @Mapping(target = "profession", source = "profession")
    @Mapping(target = "bio", source = "bio")
    @Mapping(target = "roles", source = "agentRole")
    @Mapping(target = "mfaRequired", source = "mfaRequired")
    @Mapping(target = "registerIncomplete", source = "registerIncomplete")
    IndividualInfo toIndividualInfo(Individual individual);
}
