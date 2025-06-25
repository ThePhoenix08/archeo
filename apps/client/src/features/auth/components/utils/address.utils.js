// Address validation utilities

// Basic address line validation regex
export const ADDRESS_LINE_REGEX = /^[a-zA-Z0-9\s,.\-#/()&']+$/;

// PIN code validation for India
export const PIN_CODE_REGEX = /\b\d{6}\b/;

// State names validation (common Indian states)
export const INDIAN_STATES = [
  "andhra pradesh",
  "arunachal pradesh",
  "assam",
  "bihar",
  "chhattisgarh",
  "goa",
  "gujarat",
  "haryana",
  "himachal pradesh",
  "jharkhand",
  "karnataka",
  "kerala",
  "madhya pradesh",
  "maharashtra",
  "manipur",
  "meghalaya",
  "mizoram",
  "nagaland",
  "odisha",
  "punjab",
  "rajasthan",
  "sikkim",
  "tamil nadu",
  "telangana",
  "tripura",
  "uttar pradesh",
  "uttarakhand",
  "west bengal",
  "delhi",
  "puducherry",
  "chandigarh",
  "andaman and nicobar islands",
  "dadra and nagar haveli",
  "daman and diu",
  "lakshadweep",
  "jammu and kashmir",
  "ladakh",
];

export const validateAddressLine = (line, lineNumber, maxLength = 100) => {
  if (!line || line.trim().length === 0) {
    return { isValid: true, error: null };
  }

  // Check length
  if (line.length > maxLength) {
    return {
      isValid: false,
      error: `Address line ${lineNumber} cannot exceed ${maxLength} characters`,
    };
  }

  // Check for valid characters
  if (!ADDRESS_LINE_REGEX.test(line)) {
    return {
      isValid: false,
      error: `Address line ${lineNumber} contains invalid characters`,
    };
  }

  // Specific validation for line 3 (should contain city/state/pin)
  if (lineNumber === 3 && line.trim().length > 0) {
    const hasPinCode = PIN_CODE_REGEX.test(line);
    if (!hasPinCode) {
      return {
        isValid: false,
        error: "Address line 3 should include a valid 6-digit PIN code",
      };
    }
  }

  return { isValid: true, error: null };
};

export const validateFullAddress = (addressArray, isRequired = false) => {
  if (!Array.isArray(addressArray) || addressArray.length !== 3) {
    return { isValid: false, error: "Invalid address format" };
  }

  // Check if at least one line has content
  const hasContent = addressArray.some(
    (line) => line && line.trim().length > 0
  );

  if (isRequired && !hasContent) {
    return { isValid: false, error: "Address is required" };
  }

  if (!hasContent) {
    return { isValid: true, error: null };
  }

  // Validate each line that has content
  for (let i = 0; i < addressArray.length; i++) {
    if (addressArray[i] && addressArray[i].trim().length > 0) {
      const validation = validateAddressLine(addressArray[i], i + 1);
      if (!validation.isValid) {
        return validation;
      }
    }
  }

  // Check if first line has content (most important)
  if (!addressArray[0] || addressArray[0].trim().length === 0) {
    return {
      isValid: false,
      error: "Address Line 1 is required",
    };
  }

  return { isValid: true, error: null };
};

export const formatAddressForDisplay = (addressArray) => {
  if (!Array.isArray(addressArray)) return "";

  return addressArray
    .filter((line) => line && line.trim().length > 0)
    .join(", ");
};

export const getAddressStats = (addressArray) => {
  if (!Array.isArray(addressArray)) return { totalChars: 0, linesUsed: 0 };

  const linesUsed = addressArray.filter(
    (line) => line && line.trim().length > 0
  ).length;
  const totalChars = addressArray.reduce(
    (total, line) => total + (line?.length || 0),
    0
  );

  return { totalChars, linesUsed };
};