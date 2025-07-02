package com.archeo.server.modules.common.enums;

public enum Permission {

    DOCUMENT_READ_OWN(Resource.DOCUMENT, Action.READ, Condition.OWN),
    DOCUMENT_DOWNLOAD_REQUEST(Resource.DOCUMENT, Action.DOWNLOAD, Condition.REQUEST),
    TEMPLATE_CREATE_OWN(Resource.TEMPLATE, Action.CREATE, Condition.OWN),
    DOCUMENT_VERIFY_ALL(Resource.DOCUMENT, Action.VERIFY, Condition.ALLOWED),
    API_KEY_CREATE(Resource.API_KEY, Action.CREATE, Condition.OWN),
    // Add all combinations needed...

    ;

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
