package com.archeo.server.modules.auth.repositories;

import com.archeo.server.modules.auth.models.AuthLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AuthLogsRepo extends JpaRepository<AuthLogs, UUID> {

    Optional<AuthLogs> findByRefreshToken(String refreshToken);
}
