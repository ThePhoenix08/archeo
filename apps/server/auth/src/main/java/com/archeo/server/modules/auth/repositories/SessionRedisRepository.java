package com.archeo.server.modules.auth.repositories;


import com.archeo.server.modules.common.models.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisRepository {

    private static final String PREFIX="session";
    private final RedisTemplate<String, Session>redisTemplate;

    public void save(Session session){
        String key=PREFIX+session.getId();
        long ttl= Duration.between(Instant.now(), session.getExpiresAt().toInstant()).getSeconds();
        redisTemplate.opsForValue().set(key, session, ttl, TimeUnit.SECONDS);
    }

    public Optional<Session> findById(UUID sessionId){
        String key=PREFIX+sessionId;
        Session session=redisTemplate.opsForValue().get(key);
        return Optional.ofNullable(session);
    }

    public void deleteById(UUID sessionId){
        redisTemplate.delete(PREFIX+sessionId);
    }
}
