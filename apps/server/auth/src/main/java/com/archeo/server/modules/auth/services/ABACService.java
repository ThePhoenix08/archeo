//package com.archeo.auth.services;
//
//
//import com.archeo.common.models.Permission;
//import com.archeo.common.repositories.PermissionRepo;
//import com.archeo.user.models.Owner;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class ABACService {
//
//    private final PermissionRepo permissionRepo;
//
//    public boolean isAccessGranted(Owner user, String resource, String action){
//        List<Permission> policies=permissionRepo.findByResourceAndAction(resource, action);
//        Map<String, String> attributes=user.getAttributes();
//
//        for(Permission policy:policies){
//            if(matchAttributes(policy.getAttributeConditions(), attributes));
//            return true;
//        }
//
//        return false;
//    }
//
//    private boolean matchAttributes(Map<String, String> required, Map<String, String> actual) {
//
//        for(Map.Entry<String, String> entry:required.entrySet()){
//            if(!actual.containsKey(entry.getKey())  || !actual.get(entry.getKey()).equals(entry.getValue())){
//                return false;
//            }
//        }
//
//        return true;
//    }
//}
