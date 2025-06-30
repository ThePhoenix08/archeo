import { ERROR_PRIORITY, ValidationChecks } from "@/features/auth/components/utils/register.validator.js";
import { useState, useCallback } from "react";

export const useMultiStepForm = (steps, initialData = {}, options = {}) => {
  const {
    customValidation = {},
    addressValidator = null,
    enableStepValidation = true,
    enableRealTimeValidation = false,
    onStepChange = null,
    onValidationChange = null
  } = options;

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [formData, setFormData] = useState(() => {
    const defaultData = {};
    steps.forEach(step => {
      if (step.fields) {
        // Handle step objects with fields array
        step.fields.forEach(field => {
          defaultData[field.name || field.field] = field.type === 'file' ? null :
            (Array.isArray(field.initialValue) ? field.initialValue : (field.initialValue || ""));
        });
      } else {
        // Handle simple step objects
        defaultData[step.field] = step.initialValue || "";
      }
    });
    return { ...defaultData, ...initialData };
  });

  const [errors, setErrors] = useState({});
  const [stepValidationStatus, setStepValidationStatus] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  // Enhanced input change handler
  const handleInputChange = useCallback((fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error for this field
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }

    // Real-time validation if enabled
    if (enableRealTimeValidation) {
      validateField(fieldName, value);
    }
  }, [errors, enableRealTimeValidation, validateField]);

  // Enhanced file upload handler
  const handleFileUpload = useCallback((fieldName, files) => {
    const file = files && files.length > 0 ? files[0].file || files[0] : null;

    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
      [`${fieldName}name`]: file?.name || "",
      [`${fieldName}type`]: file?.type || "",
    }));

    // Immediate file validation
    if (file) {
      const currentStepData = getCurrentStepData();
      const field = findFieldInStep(currentStepData, fieldName);
      if (field) {
        validateFile(field, file);
      }
    } else {
      // Clear file-related errors
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [findFieldInStep, validateFile, getCurrentStepData]);

  // Get current step data (handles both simple and complex step structures)
  const getCurrentStepData = useCallback(() => {
    const step = steps[currentStep];
    return step.fields ? step.fields : [step];
  }, [steps, currentStep]);

  // Find field in step data
  const findFieldInStep = useCallback((stepData, fieldName) => {
    return stepData.find(field => (field.name || field.field) === fieldName);
  }, []);

  // Validate a single field
  const validateField = useCallback((fieldName, value, file = null) => {
    const currentStepData = getCurrentStepData();
    const field = findFieldInStep(currentStepData, fieldName);

    if (!field) return null;

    const errors = [];
    const validationChecks = [
      ValidationChecks.required,
      ValidationChecks.fileRequired,
      ValidationChecks.emailFormat,
      ValidationChecks.urlFormat,
      ValidationChecks.phoneFormat,
      ValidationChecks.validOption,
      ValidationChecks.fileType,
      ValidationChecks.fileName,
      ValidationChecks.fileSize,
      ValidationChecks.documentIntegrity,
      ValidationChecks.minLength,
      ValidationChecks.maxLength,
      ValidationChecks.onlyAlphabets,
      ValidationChecks.onlyAlphanumeric,
      ValidationChecks.allowedSpecialChars,
      ValidationChecks.noConsecutiveSpaces,
      ValidationChecks.noLeadingTrailingSpaces,
      ValidationChecks.customChecker,
    ];

    // Handle address validation
    if (field.type === 'address' && addressValidator) {
      const addressError = ValidationChecks.addressValidation(value, field, addressValidator);
      if (addressError) errors.push(addressError);
    }

    // Run standard validation checks
    validationChecks.forEach((check) => {
      const error = check(value, field, file || formData[fieldName]);
      if (error) {
        errors.push(error);
      }
    });

    // Run custom validation if provided
    if (customValidation[fieldName]) {
      const customResult = customValidation[fieldName](value, formData);
      if (!customResult) {
        errors.push({
          priority: ERROR_PRIORITY.CUSTOM_LOGIC,
          message: `Invalid ${field.label || fieldName}.`
        });
      }
    }

    // Sort errors by priority and return the highest priority one
    if (errors.length > 0) {
      errors.sort((a, b) => a.priority - b.priority);
      const error = errors[0].message;

      setErrors(prev => ({ ...prev, [fieldName]: error }));
      return error;
    }

    return null;
  }, [getCurrentStepData, findFieldInStep, addressValidator, customValidation, formData]);

  // Validate file immediately
  const validateFile = useCallback((field, file) => {
    const errors = [];
    const fileValidationChecks = [
      ValidationChecks.fileType,
      ValidationChecks.fileName,
      ValidationChecks.fileSize,
      ValidationChecks.documentIntegrity,
    ];

    fileValidationChecks.forEach((check) => {
      const error = check(null, field, file);
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      errors.sort((a, b) => a.priority - b.priority);
      const fieldName = field.name || field.field;
      setErrors(prev => ({ ...prev, [fieldName]: errors[0].message }));
      return false;
    }

    return true;
  }, []);

  // Enhanced step validation
  const isStepValid = useCallback((stepIndex = currentStep) => {
    if (!enableStepValidation) return true;

    setIsValidating(true);
    const stepData = steps[stepIndex].fields || [steps[stepIndex]];
    const stepErrors = {};
    let isValid = true;

    stepData.forEach((field) => {
      const fieldName = field.name || field.field;
      const value = formData[fieldName];
      const error = validateField(fieldName, value);

      if (error) {
        stepErrors[fieldName] = error;
        isValid = false;
      }
    });

    setStepValidationStatus(prev => ({
      ...prev,
      [stepIndex]: isValid
    }));

    if (onValidationChange) {
      onValidationChange(stepIndex, isValid, stepErrors);
    }

    setIsValidating(false);
    return isValid;
  }, [currentStep, enableStepValidation, steps, formData, validateField, onValidationChange]);

  // Enhanced navigation handlers
  const handleNext = useCallback(() => {
    if (isStepValid() && currentStep < steps.length - 1) {
      setDirection("forward");
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (onStepChange) {
        onStepChange(nextStep, "forward");
      }
    }
  }, [isStepValid, currentStep, steps.length, onStepChange]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection("backward");
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      if (onStepChange) {
        onStepChange(prevStep, "backward");
      }
    }
  }, [currentStep, onStepChange]);

  const handleStepChange = useCallback((step) => {
    if (step < 0 || step > steps.length - 1 || step === currentStep) {
      return;
    }

    if (step < currentStep) {
      setDirection("backward");
      setCurrentStep(step);
      if (onStepChange) onStepChange(step, "backward");
    } else if (isStepValid()) {
      setDirection("forward");
      setCurrentStep(step);
      if (onStepChange) onStepChange(step, "forward");
    }
  }, [currentStep, steps.length, isStepValid, onStepChange]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && isStepValid()) {
      if (currentStep === steps.length - 1) {
        return true; // Indicate form should be submitted
      } else {
        handleNext();
      }
    }
    return false;
  }, [isStepValid, currentStep, steps.length, handleNext]);

  // Enhanced form reset
  const resetForm = useCallback(() => {
    setCurrentStep(0);
    setDirection("forward");
    setErrors({});
    setStepValidationStatus({});
    setIsValidating(false);

    const defaultData = {};
    steps.forEach(step => {
      if (step.fields) {
        step.fields.forEach(field => {
          defaultData[field.name || field.field] = field.type === 'file' ? null :
            (Array.isArray(field.initialValue) ? field.initialValue : (field.initialValue || ""));
        });
      } else {
        defaultData[step.field] = step.initialValue || "";
      }
    });

    setFormData({ ...defaultData, ...initialData });
  }, [steps, initialData]);

  // Validate entire form
  const validateAllSteps = useCallback(() => {
    let isFormValid = true;
    const allErrors = {};

    steps.forEach((_, index) => {
      const stepValid = isStepValid(index);
      if (!stepValid) {
        isFormValid = false;
      }
    });

    return { isValid: isFormValid, errors: allErrors };
  }, [steps, isStepValid]);

  // Get form data for submission
  const getFormData = useCallback(() => {
    return { ...formData };
  }, [formData]);

  // Get step completion status
  const getStepCompletionStatus = useCallback(() => {
    const status = {};
    steps.forEach((_, index) => {
      status[index] = stepValidationStatus[index] || false;
    });
    return status;
  }, [steps, stepValidationStatus]);

  return {
    // State
    currentStep,
    direction,
    formData,
    errors,
    isValidating,
    stepValidationStatus,

    // Handlers
    handleInputChange,
    handleFileUpload,
    handleNext,
    handleBack,
    handleKeyPress,
    handleStepChange,

    // Validation
    isStepValid,
    validateField,
    validateAllSteps,

    // Utilities
    resetForm,
    getFormData,
    getStepCompletionStatus,

    // Computed properties
    totalSteps: steps.length,
    isLastStep: currentStep === steps.length - 1,
    isFirstStep: currentStep === 0,
    currentStepData: getCurrentStepData(),
    canProceed: !enableStepValidation || isStepValid(),

    // Progress
    completionPercentage: Math.round(((currentStep + 1) / steps.length) * 100),
    completedSteps: Object.values(stepValidationStatus).filter(Boolean).length,
  };
};