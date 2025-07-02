import { ROLES } from "@/shared/constants/roles.constant";
import { ROUTES } from "@/shared/routing/routes.constant";

// Route permissions - maps routes to allowed roles
export const ROUTE_PERMISSIONS = Object.freeze({
  // Public routes - accessible to all
  [ROUTES.HOME]: [],
  [ROUTES.ABOUT]: [],
  
  [ROUTES.LOGIN]: [],
  [ROUTES.REGISTER]: [],
  [ROUTES.REGISTER_BASIC_CREDS]: [],
  [ROUTES.REGISTER_AGENT_TYPE]: [],
  [ROUTES.REGISTER_AGENT_DETAILS]: [ROLES.AGENT],
  [ROUTES.REGISTER_SELECT_ROLES]: [ROLES.AGENT],
  
  // Dashboard - accessible to all authenticated users
  [ROUTES.DASHBOARD]: [ROLES.USER],
  
  // Library section
  [ROUTES.DOCUMENTS]: [ROLES.USER],
  [ROUTES.TEMPLATES]: [ROLES.ISSUER],
  
  // Account section - accessible to all authenticated users
  [ROUTES.PROFILE]: [ROLES.USER],
  [ROUTES.SETTINGS]: [ROLES.USER],
  [ROUTES.ACTIVITY]: [ROLES.USER],
  [ROUTES.CONTACTS]: [ROLES.USER],
  
  // Document routes
  [ROUTES.DOCUMENT_VIEW]: [ROLES.USER],
  
  // Template routes - only issuers
  [ROUTES.TEMPLATE_VIEW]: [ROLES.ISSUER],
  [ROUTES.TEMPLATE_EDIT]: [ROLES.ISSUER],
  
  // API routes - only verifiers
  [ROUTES.API_ANALYTICS]: [ROLES.VERIFIER_API_CONSUMER],
  [ROUTES.API_USAGE]: [ROLES.VERIFIER_API_CONSUMER],
  [ROUTES.API_CONFIG]: [ROLES.VERIFIER_API_CONSUMER],
  [ROUTES.API_REQUESTS]: [ROLES.VERIFIER_API_CONSUMER],
  
  // Verification - public
  [ROUTES.VERIFY_QR]: [ROLES.VERIFIER_API_CONSUMER],
});