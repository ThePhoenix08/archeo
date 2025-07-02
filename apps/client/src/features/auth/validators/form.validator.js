export const DEFAULTS = Object.freeze({
  minLength: 3,
  maxLength: 100,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  dateMinAge: 16,
  dateMaxAge: 100,
  addressLineMinLength: 5,
  addressMaxLength: 300,
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
    'application/rtf'
  ],
  allowedFileExtensions: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'rtf']
});

export const Validators = Object.freeze({
  
  // Text validators
  onlyAlpha: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minLength = options.minLength || DEFAULTS.minLength;
    const maxLength = options.maxLength || DEFAULTS.maxLength;
    
    // Length check
    if (value.length < minLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be at least ${minLength} characters long.`
      };
    }
    
    if (value.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot exceed ${maxLength} characters.`
      };
    }
    
    // Only alphabets and spaces
    const alphaRegex = /^[A-Za-z\s]+$/;
    if (!alphaRegex.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} should only contain letters and spaces.`
      };
    }
    
    // No consecutive spaces
    if (/\s{2,}/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot contain consecutive spaces.`
      };
    }
    
    // No leading/trailing spaces
    if (value !== value.trim()) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot start or end with spaces.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  onlyAlphaNumeric: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minLength = options.minLength || DEFAULTS.minLength;
    const maxLength = options.maxLength || DEFAULTS.maxLength;
    const allowSpecialChars = options.allowSpecialChars || '';
    
    // Length check
    if (value.length < minLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be at least ${minLength} characters long.`
      };
    }
    
    if (value.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot exceed ${maxLength} characters.`
      };
    }
    
    // Create regex based on allowed special characters
    const escapedSpecialChars = allowSpecialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const alphaNumRegex = new RegExp(`^[A-Za-z0-9\\s${escapedSpecialChars}]+$`);
    
    if (!alphaNumRegex.test(value)) {
      const allowedCharsMsg = allowSpecialChars 
        ? `, spaces, and these characters: ${allowSpecialChars}` 
        : ' and spaces';
      return {
        isValid: false,
        errorMessage: `${fieldName} should only contain letters, numbers${allowedCharsMsg}.`
      };
    }
    
    // No consecutive spaces
    if (/\s{2,}/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot contain consecutive spaces.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  emailRegex: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const maxLength = options.maxLength || 254; // RFC standard
    
    if (value.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot exceed ${maxLength} characters.`
      };
    }
    
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    
    if (!emailRegex.test(value)) {
      return {
        isValid: false,
        errorMessage: `Please enter a valid email address (e.g., user@example.com).`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  onlyDigits: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minLength = options.minLength || 1;
    const maxLength = options.maxLength || 15;
    const exactLength = options.exactLength;
    
    // Convert to string for consistent handling
    const stringValue = value.toString();
    
    if (exactLength && stringValue.length !== exactLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be exactly ${exactLength} digits long.`
      };
    }
    
    if (!exactLength) {
      if (stringValue.length < minLength) {
        return {
          isValid: false,
          errorMessage: `${fieldName} must be at least ${minLength} digits long.`
        };
      }
      
      if (stringValue.length > maxLength) {
        return {
          isValid: false,
          errorMessage: `${fieldName} cannot exceed ${maxLength} digits.`
        };
      }
    }
    
    const digitRegex = /^\d+$/;
    if (!digitRegex.test(stringValue)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} should only contain digits.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  phoneNumber: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const country = options.country || 'IN';
    
    if (country === 'IN') {
      // Indian phone number validation
      const indianPhoneRegex = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;
      if (!indianPhoneRegex.test(value)) {
        return {
          isValid: false,
          errorMessage: `Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9).`
        };
      }
    } else {
      // Generic international phone validation
      const genericPhoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
      if (!genericPhoneRegex.test(value)) {
        return {
          isValid: false,
          errorMessage: `Please enter a valid phone number.`
        };
      }
    }
    
    return { isValid: true, errorMessage: null };
  },

  valueInGivenArray: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const allowedValues = options.allowedValues || [];
    const caseSensitive = options.caseSensitive !== false; // default true
    
    if (allowedValues.length === 0) {
      return {
        isValid: false,
        errorMessage: `No valid options provided for ${fieldName}.`
      };
    }
    
    const isValid = caseSensitive 
      ? allowedValues.includes(value)
      : allowedValues.some(val => val.toLowerCase() === value.toLowerCase());
    
    if (!isValid) {
      return {
        isValid: false,
        errorMessage: `Please select a valid ${fieldName.toLowerCase()}. Allowed values: ${allowedValues.join(', ')}.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  dateWithinLimits: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minAge = options.minAge || DEFAULTS.dateMinAge;
    const maxAge = options.maxAge || DEFAULTS.dateMaxAge;
    
    const inputDate = new Date(value);
    const today = new Date();
    
    // Check if date is valid
    if (isNaN(inputDate.getTime())) {
      return {
        isValid: false,
        errorMessage: `Please enter a valid date for ${fieldName}.`
      };
    }
    
    // Check if date is in the future
    if (inputDate > today) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot be in the future.`
      };
    }
    
    // Calculate age
    const ageInYears = Math.floor((today - inputDate) / (365.25 * 24 * 60 * 60 * 1000));
    
    if (ageInYears < minAge) {
      return {
        isValid: false,
        errorMessage: `You must be at least ${minAge} years old.`
      };
    }
    
    if (ageInYears > maxAge) {
      return {
        isValid: false,
        errorMessage: `Age cannot exceed ${maxAge} years.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  addressValidator: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minLineLength = options.minLineLength || DEFAULTS.addressLineMinLength;
    const maxTotalLength = options.maxTotalLength || DEFAULTS.addressMaxLength;
    
    // Ensure value is an array of 3 strings
    if (!Array.isArray(value) || value.length !== 3) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must contain exactly 3 address lines.`
      };
    }
    
    // Validate each line
    for (let i = 0; i < 3; i++) {
      const line = value[i] || '';
      
      if (line.trim().length < minLineLength) {
        return {
          isValid: false,
          errorMessage: `Address line ${i + 1} must be at least ${minLineLength} characters long.`
        };
      }
      
      // Check alphanumeric with common address characters
      const addressRegex = /^[A-Za-z0-9\s,.\-#/]+$/;
      if (!addressRegex.test(line)) {
        return {
          isValid: false,
          errorMessage: `Address line ${i + 1} contains invalid characters. Only letters, numbers, spaces, commas, periods, hyphens, hash, and forward slash are allowed.`
        };
      }
    }
    
    // Check if last line contains 6-digit pincode
    const lastLine = value[2];
    const pincodeRegex = /\b\d{6}\b/;
    if (!pincodeRegex.test(lastLine)) {
      return {
        isValid: false,
        errorMessage: `The last address line must contain a valid 6-digit pincode.`
      };
    }
    
    // Check total combined length
    const combinedAddress = value.join(' ').trim();
    if (combinedAddress.length > maxTotalLength) {
      return {
        isValid: false,
        errorMessage: `Total address length cannot exceed ${maxTotalLength} characters.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },

  fileValidator: (fieldName, file, options = {}) => {
    if (!file) return { isValid: true, errorMessage: null };
    
    // Check if it's a valid File object
    if (!(file instanceof File)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be a valid file.`
      };
    }
    
    const maxSize = options.maxSize || DEFAULTS.maxFileSize;
    const allowedTypes = options.allowedTypes || DEFAULTS.allowedFileTypes;
    const allowedExtensions = options.allowedExtensions || DEFAULTS.allowedFileExtensions;
    
    // File size validation
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      const currentSizeMB = Math.round(file.size / (1024 * 1024));
      return {
        isValid: false,
        errorMessage: `File size cannot exceed ${maxSizeMB}MB. Current file size: ${currentSizeMB}MB.`
      };
    }
    
    // Empty file check
    if (file.size === 0) {
      return {
        isValid: false,
        errorMessage: `The uploaded file appears to be empty or corrupted.`
      };
    }
    
    // File type validation
    if (!allowedTypes.includes(file.type)) {
      const allowedFormats = allowedTypes.map(type => 
        type.split('/')[1].toUpperCase()
      ).join(', ');
      return {
        isValid: false,
        errorMessage: `Please upload a valid document format. Supported formats: ${allowedFormats}.`
      };
    }
    
    // File extension validation
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        errorMessage: `Please upload a file with one of these extensions: ${allowedExtensions.map(ext => ext.toUpperCase()).join(', ')}.`
      };
    }
    
    // File name validation
    const fileName = file.name;
    // eslint-disable-next-line no-control-regex
    const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (invalidChars.test(fileName)) {
      return {
        isValid: false,
        errorMessage: `File name contains invalid characters. Please rename the file and try again.`
      };
    }
    
    if (fileName.length > 255) {
      return {
        isValid: false,
        errorMessage: `File name is too long. Please rename the file to be shorter than 255 characters.`
      };
    }
    
    // Security check for suspicious extensions
    const suspiciousExtensions = ['exe', 'bat', 'cmd', 'scr', 'pif', 'vbs', 'js', 'jar'];
    if (suspiciousExtensions.includes(fileExtension)) {
      return {
        isValid: false,
        errorMessage: `File type not allowed for security reasons. Please upload a document file.`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },
  passwordStrong: (fieldName, value, options = {}) => {
    if (!value) return { isValid: true, errorMessage: null };
    
    const minLength = options.minLength || 8;
    const maxLength = options.maxLength || 50;
    
    // Length validation
    if (value.length < minLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must be at least ${minLength} characters long.`
      };
    }
    
    if (value.length > maxLength) {
      return {
        isValid: false,
        errorMessage: `${fieldName} cannot exceed ${maxLength} characters.`
      };
    }
    
    // Only allow alphanumeric characters, $ and _
    const allowedCharsRegex = /^[A-Za-z0-9$_]+$/;
    if (!allowedCharsRegex.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} can only contain letters, numbers, $ and _ characters.`
      };
    }
    
    // Check for at least 1 uppercase letter
    if (!/[A-Z]/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must contain at least one uppercase letter.`
      };
    }
    
    // Check for at least 1 lowercase letter
    if (!/[a-z]/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must contain at least one lowercase letter.`
      };
    }
    
    // Check for at least 1 digit
    if (!/\d/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must contain at least one digit.`
      };
    }
    
    // Check for at least 1 symbol ($ or _)
    if (!/[$_]/.test(value)) {
      return {
        isValid: false,
        errorMessage: `${fieldName} must contain at least one symbol ($ or _).`
      };
    }
    
    return { isValid: true, errorMessage: null };
  },
});

export const validatorsNames = Object.freeze({
  ONLY_ALPHA: 'onlyAlpha',
  ONLY_ALPHA_NUMERIC: 'onlyAlphaNumeric',
  EMAIL_REGEX: 'emailRegex',
  ONLY_DIGITS: 'onlyDigits',
  PHONE_NUMBER: 'phoneNumber',
  VALUE_IN_GIVEN_ARRAY: 'valueInGivenArray',
  DATE_WITHIN_LIMITS: 'dateWithinLimits',
  ADDRESS_VALIDATOR: 'addressValidator',
  FILE_VALIDATOR: 'fileValidator',
  PASSWORD_STRONG: 'passwordStrong',
});

// USAGE EXAMPLES
/*
// Basic usage
validateField('username', 'john_doe123', { minLength: 5, maxLength: 20 });

// Email validation
validateField('email', 'user@example.com');

// Strong password validation
validateField('password', 'MyPass123, { minLength: 8, maxLength: 30 });

// Phone number validation
validateField('phoneNumber', '9876543210', { country: 'IN' });

// Select field validation
validateField('agentType', 'premium', { 
  allowedValues: ['basic', 'premium', 'enterprise'] 
});

// Date validation
validateField('dateOfBirth', '1990-05-15', { minAge: 18, maxAge: 65 });

// Address validation
validateField('address', [
  'Plot 123, Sector 45',
  'Gurgaon, Haryana',
  'India - 122001'
], { minLineLength: 3, maxTotalLength: 250 });

// File validation
validateField('proofDocument', fileObject, { 
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['application/pdf'],
  allowedExtensions: ['pdf']
});
*/