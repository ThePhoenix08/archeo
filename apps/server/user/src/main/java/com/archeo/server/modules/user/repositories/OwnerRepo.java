package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.user.models.Owner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OwnerRepo extends JpaRepository<Owner, Long> {
}
