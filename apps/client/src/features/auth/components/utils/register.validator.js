// Error Priority Levels (1 = highest priority, 5 = lowest)
const ERROR_PRIORITY = {
  REQUIRED: 1,
  TYPE_FORMAT: 2,
  LENGTH: 3,
  CHARACTER_SET: 4,
  CUSTOM_LOGIC: 5
};

// Modular validation checks
export const ValidationChecks = {
  // Required validation
  required: (value, field) => {
    if (!field.required) return null;

    if (Array.isArray(value)) {
      return value.length === 0 ? {
        priority: ERROR_PRIORITY.REQUIRED,
        message: `${field.label} is required.`
      } : null;
    }

    return (!value || value.toString().trim() === '') ? {
      priority: ERROR_PRIORITY.REQUIRED,
      message: `${field.label} is required.`
    } : null;
  },

  // Email format validation
  emailFormat: (value, field) => {
    if (!value || field.type !== 'email') return null;

    const EMAIL_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    return !EMAIL_REGEX.test(value) ? {
      priority: ERROR_PRIORITY.TYPE_FORMAT,
      message: "Please enter a valid email address (e.g., user@example.com)."
    } : null;
  },

  // URL format validation
  urlFormat: (value, field) => {
    if (!value || field.type !== 'url') return null;

    const URL_REGEX = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

    return !URL_REGEX.test(value) ? {
      priority: ERROR_PRIORITY.TYPE_FORMAT,
      message: "Please enter a valid URL starting with http:// or https://."
    } : null;
  },

  // Phone number format validation
  phoneFormat: (value, field) => {
    if (!value || field.type !== 'phoneNumber') return null;

    const IND_PHONE_REGEX = /^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/;

    return !IND_PHONE_REGEX.test(value) ? {
      priority: ERROR_PRIORITY.TYPE_FORMAT,
      message: "Please enter a valid Indian phone number (10 digits starting with 6, 7, 8, or 9)."
    } : null;
  },

  // Length validations
  minLength: (value, field) => {
    if (!value || !field.minLength) return null;

    return value.length < field.minLength ? {
      priority: ERROR_PRIORITY.LENGTH,
      message: `${field.label} must be at least ${field.minLength} characters long.`
    } : null;
  },

  maxLength: (value, field) => {
    if (!value || !field.maxLength) return null;

    return value.length > field.maxLength ? {
      priority: ERROR_PRIORITY.LENGTH,
      message: `${field.label} cannot exceed ${field.maxLength} characters.`
    } : null;
  },

  // Character set validations
  onlyAlphabets: (value, field) => {
    if (!value || !field.validation?.onlyAlphabets) return null;

    const ALPHA_REGEX = /^[A-Za-z\s]+$/;
    return !ALPHA_REGEX.test(value) ? {
      priority: ERROR_PRIORITY.CHARACTER_SET,
      message: `${field.label} should only contain letters and spaces.`
    } : null;
  },

  onlyAlphanumeric: (value, field) => {
    if (!value || !field.validation?.onlyAlphanumeric) return null;

    const ALPHANUM_REGEX = /^[A-Za-z0-9\s]+$/;
    return !ALPHANUM_REGEX.test(value) ? {
      priority: ERROR_PRIORITY.CHARACTER_SET,
      message: `${field.label} should only contain letters, numbers, and spaces.`
    } : null;
  },

  allowedSpecialChars: (value, field) => {
    if (!value || !field.validation?.allowedSpecialChars) return null;

    const allowedChars = field.validation.allowedSpecialChars;
    const escapedChars = allowedChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^[A-Za-z0-9\\s${escapedChars}]+$`);

    return !regex.test(value) ? {
      priority: ERROR_PRIORITY.CHARACTER_SET,
      message: `${field.label} can only contain letters, numbers, spaces, and these characters: ${allowedChars}`
    } : null;
  },

  noConsecutiveSpaces: (value, field) => {
    if (!value || !field.validation?.noConsecutiveSpaces) return null;

    return /\s{2,}/.test(value) ? {
      priority: ERROR_PRIORITY.CHARACTER_SET,
      message: `${field.label} cannot contain consecutive spaces.`
    } : null;
  },

  noLeadingTrailingSpaces: (value, field) => {
    if (!value || !field.validation?.noLeadingTrailingSpaces) return null;

    return value !== value.trim() ? {
      priority: ERROR_PRIORITY.CHARACTER_SET,
      message: `${field.label} cannot start or end with spaces.`
    } : null;
  },

  // Select field validation
  validOption: (value, field) => {
    if (!value || field.type !== 'select' || !field.options) return null;

    return !Object.values(field.options).includes(value) ? {
      priority: ERROR_PRIORITY.TYPE_FORMAT,
      message: `Please select a valid ${field.label.toLowerCase()}.`
    } : null;
  },

  // Custom checker validation
  customChecker: (value, field) => {
    if (!value || !field.checker) return null;

    const result = field.checker(value);

    if (result && !result.isValid && !result.valid) {
      return {
        priority: ERROR_PRIORITY.CUSTOM_LOGIC,
        message: result.errors ? result.errors.join(", ") :
          result.reason || `Invalid ${field.label.toLowerCase()}.`
      };
    }

    return null;
  },

  // File validation checks
  fileRequired: (_, field, file) => {
    if (!field.required || field.type !== 'file') return null;

    // Check if file exists in formData
    const fileExists = file instanceof File;

    return !fileExists ? {
      priority: ERROR_PRIORITY.REQUIRED,
      message: `${field.label} is required. Please upload a document.`
    } : null;
  },

  fileType: (_, field, file) => {
    if (field.type !== 'file' || !file || !(file instanceof File)) return null;

    const allowedTypes = field.validation?.allowedFileTypes || [];
    const allowedExtensions = field.validation?.allowedExtensions || [];

    if (allowedTypes.length === 0 && allowedExtensions.length === 0) return null;

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    // Check MIME type
    if (allowedTypes.length > 0 && !allowedTypes.includes(mimeType)) {
      return {
        priority: ERROR_PRIORITY.TYPE_FORMAT,
        message: `Please upload a valid document format. Supported formats: ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}.`
      };
    }

    // Check file extension
    if (allowedExtensions.length > 0 && !allowedExtensions.includes(fileExtension)) {
      return {
        priority: ERROR_PRIORITY.TYPE_FORMAT,
        message: `Please upload a file with one of these extensions: ${allowedExtensions.map(ext => ext.toUpperCase()).join(', ')}.`
      };
    }

    return null;
  },

  fileSize: (_, field, file) => {
    if (field.type !== 'file' || !file || !(file instanceof File)) return null;

    const maxSize = field.validation?.maxFileSize || 10 * 1024 * 1024; // Default 10MB
    const minSize = field.validation?.minFileSize || 1024; // Default 1KB

    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return {
        priority: ERROR_PRIORITY.LENGTH,
        message: `File size cannot exceed ${maxSizeMB}MB. Current file size: ${Math.round(file.size / (1024 * 1024))}MB.`
      };
    }

    if (file.size < minSize) {
      return {
        priority: ERROR_PRIORITY.LENGTH,
        message: `File appears to be too small or corrupted. Minimum size: ${Math.round(minSize / 1024)}KB.`
      };
    }

    return null;
  },

  fileName: (_, field, file) => {
    if (field.type !== 'file' || !file || !(file instanceof File)) return null;

    const fileName = file.name;

    // Check for valid filename characters
    // eslint-disable-next-line no-control-regex
    const invalidChars = /[<>:"/\\|?*\x00-\x1f]/;
    if (invalidChars.test(fileName)) {
      return {
        priority: ERROR_PRIORITY.CHARACTER_SET,
        message: `File name contains invalid characters. Please rename the file and try again.`
      };
    }

    // Check filename length
    if (fileName.length > 255) {
      return {
        priority: ERROR_PRIORITY.LENGTH,
        message: `File name is too long. Please rename the file to be shorter than 255 characters.`
      };
    }

    // Check for suspicious extensions
    const suspiciousExtensions = ['exe', 'bat', 'cmd', 'scr', 'pif', 'vbs', 'js', 'jar'];
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (suspiciousExtensions.includes(fileExtension)) {
      return {
        priority: ERROR_PRIORITY.TYPE_FORMAT,
        message: `File type not allowed for security reasons. Please upload a document file.`
      };
    }

    return null;
  },

  documentIntegrity: (_, field, file) => {
    if (field.type !== 'file' || !file || !(file instanceof File)) return null;

    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();

    // Basic integrity checks
    if (file.size === 0) {
      return {
        priority: ERROR_PRIORITY.TYPE_FORMAT,
        message: `The uploaded file appears to be empty or corrupted. Please try uploading again.`
      };
    }

    // Check if file extension matches MIME type for common document types
    const mimeExtensionMap = {
      'application/pdf': ['pdf'],
      'application/msword': ['doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx'],
      'application/vnd.ms-excel': ['xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx'],
      'text/plain': ['txt'],
      'application/rtf': ['rtf']
    };

    const expectedExtensions = mimeExtensionMap[file.type];
    if (expectedExtensions && !expectedExtensions.includes(fileExtension)) {
      return {
        priority: ERROR_PRIORITY.TYPE_FORMAT,
        message: `File type mismatch detected. Please ensure the file is not corrupted or renamed.`
      };
    }

    return null;
  },
};