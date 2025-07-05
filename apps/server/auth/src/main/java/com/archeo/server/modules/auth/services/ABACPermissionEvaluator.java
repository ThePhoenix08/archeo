package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.CustomUserDetails;
import com.archeo.server.modules.common.enums.Action;
import com.archeo.server.modules.common.enums.Condition;
import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.Resource;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
public class ABACPermissionEvaluator implements PermissionEvaluator {
    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {

        if(authentication==null || !(permission instanceof String)){
            return false;
        }

        String[] parts=((String) permission).split(":");
        if(parts.length!=3){
            return false;
        }

        Resource resource;
        Action action;
        Condition condition;

        try{
            resource=Resource.valueOf(parts[0].toUpperCase());
            action=Action.valueOf(parts[1].toUpperCase());
            condition=Condition.valueOf(parts[2].toUpperCase());
        }
        catch (IllegalArgumentException ex){
            return false;
        }
        return hasABACPermission(authentication, resource, action, condition, targetDomainObject);
    }

    private boolean hasABACPermission(Authentication authentication, Resource resource, Action action, Condition condition, Object targetDomainObject) {

        if(!(authentication.getPrincipal() instanceof CustomUserDetails userDetails)) return false;

        List<Permission> userPermissions=userDetails.getPermission();

        for(Permission p:userPermissions){
            if(p.getResource()==resource && p.getAction()==action && p.getCondition()==condition){
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return false;
    }
}
