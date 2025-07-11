export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  HELP: '/help',
  SITEMAP: '/sitemap',
  
  LOGIN: '/login',
  REGISTER_BASIC_CREDS: '/register',
  REGISTER_AGENT_TYPE: '/register/select-agent-type',
  REGISTER_AGENT_DETAILS: '/register/details-form',
  REGISTER_SELECT_ROLES: '/register/select-roles',
  FORGOT_PASSWORD: '/forgot-password',
  ACCOUNT_RECOVERY: '/account-recovery',

  // Dynamic routes
  VERIFY_QR: (qrUrl) => `/verify/${qrUrl}`,
  
  // protectedRoutes
  // App routes 
  DASHBOARD: '/app',
  
  // Library section
  TEMPLATES: '/app/library/templates',
  DOCUMENTS: '/app/library/documents',
  
  // Account section
  ACCOUNT: '/app/account',
  PROFILE: '/app/account/profile',
  SETTINGS: '/app/account/settings',
  ACTIVITY: '/app/account/activity',
  CONTACTS: '/app/account/contacts',
  
  // Document routes
  DOCUMENT_VIEW: (id) => `/app/document/${id}/view`,
  
  // Template routes
  TEMPLATE_VIEW: (id) => `/app/template/${id}/view`,
  TEMPLATE_EDIT: (id) => `/app/template/${id}/edit`,
  
  // API routes
  API_ANALYTICS: '/app/api',
  API_USAGE: '/app/api/usage',
  API_CONFIG: '/app/api/config',
  API_REQUESTS: '/app/api/requests',
};