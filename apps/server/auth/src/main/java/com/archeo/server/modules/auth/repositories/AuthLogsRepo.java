package com.archeo.auth.repositories;

import com.archeo.auth.models.AuthLogs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthLogsRepo extends JpaRepository<AuthLogs, Long> {
}
