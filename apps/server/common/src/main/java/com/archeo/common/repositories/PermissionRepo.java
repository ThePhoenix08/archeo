package com.archeo.server.modules.auth.repositories;

import com.archeo.common.models.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PermissionRepo extends JpaRepository<Permission, Long> {
    List<Permission> findByResourceAndAction(String resource, String action);
}
