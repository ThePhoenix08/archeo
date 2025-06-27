package com.archeo.server.modules.auth.repositories;

import com.archeo.server.modules.common.models.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface SessionRedisRepository extends CrudRepository<Session, UUID> {
    Optional<Session> findByUserId(Long userId);
}
