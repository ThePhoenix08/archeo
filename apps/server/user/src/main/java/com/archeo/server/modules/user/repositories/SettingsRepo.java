package com.archeo.server.modules.user.repositories;

import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.models.Settings;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SettingsRepo extends JpaRepository<Settings, UUID> {
    Optional<Settings> findByAgent(Agent agent);
}
