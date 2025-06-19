import { ROLES } from "@/shared/constants/roles.constant.js"

export const getLoginFieldsForRole = {
  [ROLES.USER]: [
    {
      name: "username",
      type: "text",
      label: "Username",
      required: true,
      initialValue: ""
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      required: true,
      initialValue: ""
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      initialValue: ""
    },
  ]
}

export const getRegisterFieldsForRole = {
  [ROLES.USER]: [
    { name: "username", type: "text", label: "Username", required: true, initialValue: "" },
    { name: "email", type: "email", label: "Email", required: true, initialValue: "" },
    {
      name: "password",
      type: "password",
      label: "Password",
      required: true,
      initialValue: ""
    },
  ]
}