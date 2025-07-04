package com.archeo.server.modules.common.enums;

public enum Permission {

    // --- USER ---
    PROFILE_CREATE_OWN(Resource.PROFILE, Action.CREATE, Condition.OWN),
    PROFILE_READ_OWN(Resource.PROFILE, Action.READ, Condition.OWN),
    PROFILE_UPDATE_OWN(Resource.PROFILE, Action.UPDATE, Condition.OWN),
    PROFILE_DELETE_OWN(Resource.PROFILE, Action.DELETE, Condition.OWN),
    SETTINGS_UPDATE_OWN(Resource.SETTINGS, Action.UPDATE, Condition.OWN),
    DASHBOARD_READ_OWN(Resource.DASHBOARD, Action.READ, Condition.OWN),
    PROFILE_AUDIT_ALL_READ(Resource.PROFILE_AUDIT, Action.READ, Condition.ALL),
    CONTACT_READ_ASSOCIATED(Resource.CONTACT, Action.READ, Condition.ASSOCIATED),
    SIGNATURE_READ_ALL(Resource.SIGNATURE, Action.READ, Condition.ALL),
    NOTIF_READ_OWN(Resource.NOTIF, Action.READ, Condition.OWN),
    NOTIF_MARK_OWN(Resource.NOTIF, Action.MARK, Condition.OWN),
    NOTIF_DELETE_OWN(Resource.NOTIF, Action.DELETE, Condition.OWN),

    // --- OWNER ---
    DOCUMENT_READ_OWN(Resource.DOCUMENT, Action.READ, Condition.OWN),
    DOCUMENT_DOWNLOAD_OWN(Resource.DOCUMENT, Action.DOWNLOAD, Condition.OWN),
    DOCUMENT_ACCESS_AUDIT_READ_OWN(Resource.DOCUMENT_ACCESS_AUDIT, Action.READ, Condition.OWN),
    DOCUMENT_VERSION_AUDIT_READ_OWN(Resource.DOCUMENT_VERSION_AUDIT, Action.READ, Condition.OWN),
    DOCUMENT_METADATA_READ_OWN(Resource.DOCUMENT_METADATA, Action.READ, Condition.OWN),
    DOCUMENT_SHARE_OWN(Resource.DOCUMENT, Action.SHARE, Condition.OWN),
    DOCUMENT_DISBAND_OWN(Resource.DOCUMENT, Action.DISBAND, Condition.OWN),
    DOCUMENT_BULK_READ_OWN(Resource.DOCUMENT_BULK, Action.READ, Condition.OWN),
    DOCUMENT_BULK_CLAIM_OWN(Resource.DOCUMENT_BULK, Action.CLAIM, Condition.OWN),
    DOCUMENT_BULK_FAVORITE_OWN(Resource.DOCUMENT_BULK, Action.FAVORITE, Condition.OWN),

    // --- ISSUER ---
    TEMPLATE_BULK_READ_OWN(Resource.TEMPLATE_BULK, Action.READ, Condition.OWN),
    TEMPLATE_UPDATE_OWN(Resource.TEMPLATE, Action.UPDATE, Condition.OWN),
    TEMPLATE_CREATE_OWN(Resource.TEMPLATE, Action.CREATE, Condition.OWN),
    TEMPLATE_BULK_DELETE_OWN(Resource.TEMPLATE_BULK, Action.DELETE, Condition.OWN),
    TEMPLATE_CLONE_OWN(Resource.TEMPLATE, Action.CLONE, Condition.OWN),
    TEMPLATE_OWN_AUDIT_ALL(Resource.TEMPLATE_AUDIT, Action.READ, Condition.OWN),
    TEMPLATE_PREVIEW_OWN(Resource.TEMPLATE, Action.PREVIEW, Condition.OWN),
    DATA_TABLE_READ_OWN(Resource.DATA_TABLE, Action.READ, Condition.OWN),
    DATA_TABLE_UPDATE_OWN(Resource.DATA_TABLE, Action.UPDATE, Condition.OWN),
    DATA_TABLE_CREATE_OWN(Resource.DATA_TABLE, Action.CREATE, Condition.OWN),
    DATA_TABLE_DELETE_OWN(Resource.DATA_TABLE, Action.DELETE, Condition.OWN),
    DATA_TABLE_IMPORT_OWN(Resource.DATA_TABLE, Action.IMPORT, Condition.OWN),
    DATA_TABLE_EXPORT_OWN(Resource.DATA_TABLE, Action.EXPORT, Condition.OWN),
    TEMPLATE_PUBLISH_OWN(Resource.TEMPLATE, Action.PUBLISH, Condition.OWN),
    DOCUMENT_BULK_CREATE(Resource.DOCUMENT_BULK, Action.CREATE, Condition.GLOBAL),
    DOCUMENT_METADATA_READ_ISSUED(Resource.DOCUMENT_METADATA, Action.READ, Condition.ISSUED),
    DOCUMENT_METADATA_UPDATE_ISSUED(Resource.DOCUMENT_METADATA, Action.UPDATE, Condition.ISSUED),
    DOCUMENT_BULK_READ_ISSUED(Resource.DOCUMENT_BULK, Action.READ, Condition.ISSUED),
    DOCUMENT_BULK_REVOKE_ISSUED(Resource.DOCUMENT_BULK, Action.REVOKE, Condition.ISSUED),
    DOCUMENT_BULK_EXPIRE_ISSUED(Resource.DOCUMENT_BULK, Action.EXPIRE, Condition.ISSUED),
    DOCUMENT_BULK_RENEW_ISSUED(Resource.DOCUMENT_BULK, Action.RENEW, Condition.ISSUED),
    DOCUMENT_VERSION_AUDIT_READ_ISSUED(Resource.DOCUMENT_VERSION_AUDIT, Action.READ, Condition.ISSUED),
    SIGNATURE_UPDATE_OWN(Resource.SIGNATURE, Action.UPDATE, Condition.OWN),
    SIGNATURE_DISBAND_OWN(Resource.SIGNATURE, Action.DISBAND, Condition.OWN),
    DOMAIN_CREATE(Resource.DOMAIN, Action.CREATE, Condition.GLOBAL),
    DOMAIN_ADD_TEMPLATE_OWN(Resource.DOMAIN, Action.ADD_TEMPLATE, Condition.OWN),

    // --- VERIFIER ---
    DOCUMENT_METADATA_READ_SHARED(Resource.DOCUMENT_METADATA, Action.READ, Condition.SHARED),
    DOCUMENT_BULK_READ_SHARED(Resource.DOCUMENT_BULK, Action.READ, Condition.SHARED),
    DOCUMENT_BULK_SHARED_DOWNLOAD_ALLOWED(Resource.DOCUMENT_BULK_SHARED, Action.DOWNLOAD, Condition.ALLOWED),
    DOCUMENT_SHARED_AUDIT_ALL_READ_ALLOWED(Resource.DOCUMENT_SHARED_AUDIT_ALL, Action.READ, Condition.ALLOWED),
    DOCUMENT_SHARED_AUDIT_VERSION_READ_ALLOWED(Resource.DOCUMENT_SHARED_AUDIT_VERSION, Action.READ, Condition.ALLOWED),
    DOCUMENT_SHARED_AUDIT_ACCESS_READ_ALLOWED(Resource.DOCUMENT_SHARED_AUDIT_ACCESS, Action.READ, Condition.ALLOWED),
    DOCUMENT_VERIFY_ALL(Resource.DOCUMENT, Action.VERIFY, Condition.ALL),
    DOCUMENT_READ_REDACTED_ALLOWED(Resource.DOCUMENT, Action.READ_REDACTED, Condition.ALLOWED),
    DOCUMENT_BULK_READ_REQUEST(Resource.DOCUMENT_BULK, Action.READ, Condition.REQUEST),
    DOCUMENT_BULK_DOWNLOAD_REQUEST(Resource.DOCUMENT_BULK, Action.DOWNLOAD, Condition.REQUEST),
    DOCUMENT_BULK_CUSTOM_REQUEST(Resource.DOCUMENT_BULK, Action.CUSTOM, Condition.REQUEST),

    // --- API ---
    API_CONFIG_CREATE(Resource.API_CONFIG, Action.CREATE, Condition.ALLOWED),
    API_CONFIG_UPDATE(Resource.API_CONFIG, Action.UPDATE, Condition.ALLOWED),
    API_CONFIG_DESTROY(Resource.API_CONFIG, Action.DESTROY, Condition.ALLOWED),

    API_KEY_CREATE(Resource.API_KEY, Action.CREATE, Condition.ALLOWED),
    API_KEY_REGENERATE(Resource.API_KEY, Action.REGENERATE, Condition.ALLOWED),
    API_KEY_DISBAND(Resource.API_KEY, Action.DISBAND, Condition.ALLOWED),

    API_USAGE_READ(Resource.API_USAGE, Action.READ, Condition.ALLOWED),
    API_AUDIT_READ(Resource.API_AUDIT, Action.READ, Condition.ALLOWED);


    private final Resource resource;
    private final Action action;
    private final Condition condition;

    Permission(Resource resource, Action action, Condition condition) {
        this.resource = resource;
        this.action = action;
        this.condition = condition;
    }

    public Resource getResource() { return resource; }
    public Action getAction() { return action; }
    public Condition getCondition() { return condition; }
}
