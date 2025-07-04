package com.archeo.server.modules.auth.config;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.models.UsersCommon;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public class CustomUserDetails extends org.springframework.security.core.userdetails.User {
    private final UUID userId;
    private final List<Permission> permission;

    public CustomUserDetails(UsersCommon user, Collection<? extends GrantedAuthority> authorities, List<Permission> permission) {
        super(user.getEmail(), user.getPassword(), authorities);
        this.userId = user.getId();
        this.permission = permission;
    }

    public UUID getUserId() {
        return userId;
    }

    public List<Permission> getPermission() {
        return permission;
    }
}
