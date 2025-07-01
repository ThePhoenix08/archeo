// AGENT
export const AGENT_TYPES = Object.freeze({
  INDIVIDUAL: 'individual',
	ORGANIZATION: 'organization'
});

export const AGENT_TYPES_LIST = Object.freeze(Object.values(AGENT_TYPES));
/** @param {string} agentType */
export const isValidAgentType = (agentType) => AGENT_TYPES_LIST.includes(agentType);

// ROLE
export const ROLES = Object.freeze({
  USER: 'user',
	OWNER: 'owner',

	ISSUER: 'issuer',
	
  VERIFIER: 'verifier',
	VERIFIER_API_CONSUMER: 'verifier api consumer',
	
	ADMIN: 'admin',
});

export const ROLES_LIST = Object.freeze(Object.values(ROLES));
/** @param {string} role */
export const isValidRole = (role) => ROLES_LIST.includes(role);

// PERMISSION
const PERMISSIONS = Object.freeze({
	
})