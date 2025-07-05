package com.archeo.server.modules.auth.components;

import com.archeo.server.modules.common.enums.Permission;
import com.archeo.server.modules.common.enums.USER_ROLE;

import java.util.*;

public class RolePermissionMapping {

    private static final Map<USER_ROLE, List<Permission>> roleToPermissions = new EnumMap<>(USER_ROLE.class);

    static {
        roleToPermissions.put(USER_ROLE.ROLE_OWNER, List.of(
                Permission.PROFILE_CREATE_OWN,
                Permission.PROFILE_READ_OWN,
                Permission.PROFILE_UPDATE_OWN,
                Permission.PROFILE_DELETE_OWN,
                Permission.SETTINGS_UPDATE_OWN,
                Permission.DASHBOARD_READ_OWN,
                Permission.PROFILE_AUDIT_ALL_READ,
                Permission.CONTACT_READ_ASSOCIATED,
                Permission.SIGNATURE_READ_ALL,
                Permission.NOTIF_READ_OWN,
                Permission.NOTIF_MARK_OWN,
                Permission.NOTIF_DELETE_OWN,
                Permission.DOCUMENT_READ_OWN,
                Permission.DOCUMENT_DOWNLOAD_OWN,
                Permission.DOCUMENT_ACCESS_AUDIT_READ_OWN,
                Permission.DOCUMENT_VERSION_AUDIT_READ_OWN,
                Permission.DOCUMENT_METADATA_READ_OWN,
                Permission.DOCUMENT_SHARE_OWN,
                Permission.DOCUMENT_DISBAND_OWN,
                Permission.DOCUMENT_BULK_READ_OWN,
                Permission.DOCUMENT_BULK_CLAIM_OWN,
                Permission.DOCUMENT_BULK_FAVORITE_OWN
        ));

        roleToPermissions.put(USER_ROLE.ROLE_ISSUER, List.of(
                Permission.TEMPLATE_BULK_READ_OWN,
                Permission.TEMPLATE_UPDATE_OWN,
                Permission.TEMPLATE_CREATE_OWN,
                Permission.TEMPLATE_BULK_DELETE_OWN,
                Permission.TEMPLATE_CLONE_OWN,
                Permission.TEMPLATE_OWN_AUDIT_ALL,
                Permission.TEMPLATE_PREVIEW_OWN,
                Permission.DATA_TABLE_READ_OWN,
                Permission.DATA_TABLE_UPDATE_OWN,
                Permission.DATA_TABLE_CREATE_OWN,
                Permission.DATA_TABLE_DELETE_OWN,
                Permission.DATA_TABLE_IMPORT_OWN,
                Permission.DATA_TABLE_EXPORT_OWN,
                Permission.TEMPLATE_PUBLISH_OWN,
                Permission.DOCUMENT_BULK_CREATE,
                Permission.DOCUMENT_METADATA_READ_ISSUED,
                Permission.DOCUMENT_METADATA_UPDATE_ISSUED,
                Permission.DOCUMENT_BULK_READ_ISSUED,
                Permission.DOCUMENT_BULK_REVOKE_ISSUED,
                Permission.DOCUMENT_BULK_EXPIRE_ISSUED,
                Permission.DOCUMENT_BULK_RENEW_ISSUED,
                Permission.DOCUMENT_VERSION_AUDIT_READ_ISSUED,
                Permission.SIGNATURE_UPDATE_OWN,
                Permission.SIGNATURE_DISBAND_OWN,
                Permission.DOMAIN_CREATE,
                Permission.DOMAIN_ADD_TEMPLATE_OWN
        ));

        roleToPermissions.put(USER_ROLE.ROLE_VERIFIER, List.of(
                Permission.DOCUMENT_METADATA_READ_SHARED,
                Permission.DOCUMENT_BULK_READ_SHARED,
                Permission.DOCUMENT_BULK_SHARED_DOWNLOAD_ALLOWED,
                Permission.DOCUMENT_SHARED_AUDIT_ALL_READ_ALLOWED,
                Permission.DOCUMENT_SHARED_AUDIT_VERSION_READ_ALLOWED,
                Permission.DOCUMENT_SHARED_AUDIT_ACCESS_READ_ALLOWED,
                Permission.DOCUMENT_VERIFY_ALL,
                Permission.DOCUMENT_READ_REDACTED_ALLOWED,
                Permission.DOCUMENT_BULK_READ_REQUEST,
                Permission.DOCUMENT_BULK_DOWNLOAD_REQUEST,
                Permission.DOCUMENT_BULK_CUSTOM_REQUEST
        ));

        roleToPermissions.put(USER_ROLE.ROLE_API_CONSUMER, List.of(
                Permission.API_CONFIG_CREATE,
                Permission.API_CONFIG_UPDATE,
                Permission.API_CONFIG_DESTROY,
                Permission.API_KEY_CREATE,
                Permission.API_KEY_REGENERATE,
                Permission.API_KEY_DISBAND,
                Permission.API_USAGE_READ,
                Permission.API_AUDIT_READ
        ));

        // You can include other roles such as ADMIN or SUPERADMIN similarly.
    }

    public static List<Permission> getPermissionsForRoles(Collection<USER_ROLE> roles) {
        Set<Permission> permissionSet = new HashSet<>();
        for (USER_ROLE role : roles) {
            permissionSet.addAll(roleToPermissions.getOrDefault(role, List.of()));
        }
        return List.copyOf(permissionSet);
    }

    public static boolean hasPermission(Collection<USER_ROLE> roles, Permission requiredPermission) {
        return getPermissionsForRoles(roles).contains(requiredPermission);
    }
}
