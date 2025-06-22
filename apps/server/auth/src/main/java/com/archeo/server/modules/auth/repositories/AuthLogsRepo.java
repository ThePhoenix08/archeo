package com.archeo.server.modules.auth.repositories;

import com.archeo.server.modules.auth.models.AuthLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthLogsRepo extends JpaRepository<AuthLogs, Long> {
}
