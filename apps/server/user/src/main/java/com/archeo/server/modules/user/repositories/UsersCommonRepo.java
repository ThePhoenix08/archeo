package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.UsersCommon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersCommonRepo extends JpaRepository<UsersCommon, Long>  {
    Optional<UsersCommon> findByUsername(String username);
    Optional<UsersCommon> findByEmail(String email);
}
