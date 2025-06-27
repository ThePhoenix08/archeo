package com.archeo.server.modules.common.models;

import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.UUID;

@Data
@RedisHash(value = "session", timeToLive = 259200)
public class Session implements Serializable {

    @Id
    private UUID id;

    private Long userId;

    private String refreshTokenHash;

    private String ipAddress;

    private String userAgent;

    private Timestamp expiresAt;

    private Timestamp createdAt;
}