package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.user.models.OwnerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OwnerProfileRepo extends JpaRepository<OwnerProfile, Long> {
    Optional<OwnerProfile> findByUser(UsersCommon user);
}
