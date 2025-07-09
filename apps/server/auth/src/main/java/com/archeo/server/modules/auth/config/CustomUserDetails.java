package com.archeo.server.modules.auth.config;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.models.Agent;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class CustomUserDetails extends org.springframework.security.core.userdetails.User {
    private final UUID userId;
    private final List<Permission> permission;

    public CustomUserDetails(Agent agent, Collection<? extends GrantedAuthority> authorities, List<Permission> permission) {
        super(agent.getEmail(), agent.getPassword(), authorities);
        this.userId = agent.getId();
        this.permission = permission;
    }

    public UUID getUserId() {
        return userId;
    }

    public List<Permission> getPermission() {
        return permission;
    }
}
