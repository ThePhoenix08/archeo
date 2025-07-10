package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.models.Individual;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface IndividualRepo extends JpaRepository<Individual, UUID> {



    Optional<Individual> findByAgent(Agent agent);


    @Query("SELECT i FROM Individual i WHERE i.agent.email = :email")
    Optional<Individual> findByAgentEmail(@Param("email") String email);

    boolean existsByAgent(Agent agent);
}

