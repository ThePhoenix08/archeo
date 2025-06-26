package com.archeo.server.modules.user.config;


import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.context.annotation.Configuration;
import redis.embedded.RedisServer;
import redis.embedded.core.RedisServerBuilder;

import java.io.IOException;

@Configuration
public class EmbeddedRedisConfig {

    private RedisServer redisServer;

    @PostConstruct
    public void startRedis() throws IOException {
        redisServer = new RedisServerBuilder()
                .port(6370)
                .setting("maxmemory 128M")
                .build();
    }

    @PreDestroy
    public void stopRedis() throws IOException {
        if(redisServer!=null){
            redisServer.stop();;
        }
    }
}
