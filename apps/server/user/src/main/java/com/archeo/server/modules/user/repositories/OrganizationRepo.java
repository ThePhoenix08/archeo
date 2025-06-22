package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.user.models.Organization;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepo extends JpaRepository<Organization, Long> {
}
