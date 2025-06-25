package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepo extends JpaRepository<Owner, Long> {
    Optional<Object> findByUser(UsersCommon user);

    @Query("SELECT o FROM Owner o WHERE o.user.email = :email")
    Optional<Owner> findByUserEmail(@Param("email") String email);
}
