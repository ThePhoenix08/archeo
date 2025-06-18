export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/about',
  LOGIN: '/login',
  REGISTER: '/register',
  
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
  
  // Dynamic routes
  VERIFY_QR: (qrUrl) => `/verify/${qrUrl}`,
};