package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.models.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface OrganizationRepo extends JpaRepository<Organization, UUID> {


    @Query("SELECT o FROM Organization o WHERE o.agent.email = :email")
    Optional<Organization> findByAgentEmail(@Param("email") String email);

    Optional<Organization> findByAgent(Agent agent);


    boolean existsByAgent(Agent agent);
}

