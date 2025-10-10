package com.archeo.server.modules.application;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/health")
public class HealthController {

    private final HealthEndpoint healthEndpoint;


    @GetMapping
    public ResponseEntity<?> getHealthStatus() {
        Health health = (Health) healthEndpoint.health();

        System.out.println("Get health");
        return ResponseEntity.ok(Map.of(
                "success", true,
                "statusCode", 200,
                "message", "Server is healthy",
                "data", Map.of(
                        "status", health.getStatus().getCode(),
                        "details", health.getDetails()
                )
        ));
    }
}
