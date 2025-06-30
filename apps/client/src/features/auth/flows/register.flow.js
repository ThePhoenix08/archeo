import { useLoginMutation, useRegisterMutation } from "@/features/auth/actions/authApi.action.js";
import { REGISTRATION_STEPS } from "@/features/auth/flows/flow.constant.js";
import { ROLES } from "@/shared/constants/roles.constant.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// auth flow notes
// login / register link click
// User Agent Operations > 1. Basic Credentials Form open
	// if login:
		// form
			// username
			// email
			// password
			// OAuth option: Sign In
		// after submit flow:
			// validate formData
			// send formData on /auth/login route
				// if success redirect
				// if failure show error
	// if register:
		// form
			// username
			// email
			// password
			// OAuth option: Sign Up
		// after submit flow:
			// validate formData
			// send formData on /auth/registerAgent
				// if failure error quit, if success next
			// ask "Individual" or "Organization"
				// if Individual:
					// form: 2. Agent Details Form
						// fullname
						// date of birth
						// phone number
					// after submit flow:
						// validate formData
						// store formData for next step
				// if Organization:
					// form: 2. Agent Details Form
						// basic details: orgname, orgtype, org official phone no, office address, org website URL (optional)
						// contact details: contact person name,  contact mobile no, contact designation
						// document proof
					// after submit flow:
						// validate new formData
						// combine formData with older formData stored from last step
						// store formData for next step
			// ROLES questions:
				// form: 3. Roles form
					// ISSUER: 'Will you be issuing documents to users?',
					// VERIFIER: 'Will you be verifying user documents?',
					// OWNER: 'Will you be managing document ownership and access?',
					// VERIFIER_API: 'Do you need API access for document verification?'
				// after submit flow:
					// validate formData
					// combine form data with last step's formdata
					// finally send formData on /auth/register/:agentType, :agentType = ENUM["individual", "organization"]
						// if success, log in to ROUTES.DASHBOARD
						// if failure, show error or redirect to error page

const BASIC_CREDENTIALS_BLUEPRINT = {
  username: "",
  email: "",
  password: "",
}
const FINAL_REGISTER_DATA_BLUEPRINT = {
  agentId: null,
  
  agentType: null,

  fullName: "",
  dateOfBirth: "",
  phoneNumber: "",

  orgName: "",
  orgType: "",
  orgOfficialPhoneNumber: "",
  orgOfficeAddress: "",
  orgWebsiteURL: "",

  contactPersonName: "",
  contactMobileNumber: "",
  contactDesignation: "",
  // fileUpload / documentProofFile:
}

// const [agentFormData, setAgentFormData] = useState(AGENT_FORM_DATA_BLUEPRINT);
// const [agentType, setAgentType] = useState(null);
// const [agentDetails, setAgentDetails] = useState(AGENT_DETAILS_BLUEPRINT);
// const [rolesSelection, setRolesSelection] = useState([ROLES.USER]);

export const useRegisterFlow = () => {
  const [currentAuthStep, setAuthStep] = useState(0);
  const [basicCredentials, setBasicCredentials] = useState(BASIC_CREDENTIALS_BLUEPRINT);
  const [finalFormData, setFinalFormData] = useState(FINAL_REGISTER_DATA_BLUEPRINT);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, registerResult] = useRegisterMutation();

  const basicCredsFlow = () => {

  }
}