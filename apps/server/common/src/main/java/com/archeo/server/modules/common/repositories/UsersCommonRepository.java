package com.archeo.server.modules.common.repositories;

import com.archeo.server.modules.common.models.UsersCommon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UsersCommonRepository extends JpaRepository<UsersCommon, UUID> {

    Optional<UsersCommon> findByEmail(String email);
    Optional<UsersCommon> findByUsername(String username);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}