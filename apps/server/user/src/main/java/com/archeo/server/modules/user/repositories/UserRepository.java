package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.user.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Owner, Long> {

    Optional<Owner> findByEmail(String email);
    Optional<Owner> findByUsername(String username);
}