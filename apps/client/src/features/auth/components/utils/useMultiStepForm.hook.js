import { useState } from "react";

export const useMultiStepForm = (steps, initialData = {}, customValidation = {}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState("forward");
  const [formData, setFormData] = useState(() => {
    const defaultData = {};
    steps.forEach(step => {
      defaultData[step.field] = "";
    });
    return { ...defaultData, ...initialData };
  });

  const handleInputChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      [steps[currentStep].field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection("forward");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection("backward");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepChange = (step) => {
    if (step < 0 || step > steps.length - 1 || step === currentStep) {
      return;
    }
    if (step < currentStep) {
      setDirection("backward");
      setCurrentStep(step);
    } else if (isStepValid()) {
      setDirection("forward");
      setCurrentStep(step);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isStepValid()) {
      if (currentStep === steps.length - 1) {
        return true; // Indicate form should be submitted
      } else {
        handleNext();
      }
    }
    return false;
  };

  const isStepValid = () => {
    const value = formData[steps[currentStep].field];
    if (!value) return false;

    // Check custom validation first
    if (customValidation[steps[currentStep].field]) {
      return customValidation[steps[currentStep].field](value, formData);
    }

    return true;
  };

  const resetForm = () => {
    setCurrentStep(0);
    setDirection("forward");
    const defaultData = {};
    steps.forEach(step => {
      defaultData[step.field] = "";
    });
    setFormData({ ...defaultData, ...initialData });
  };

  return {
    currentStep,
    direction,
    formData,
    handleInputChange,
    handleNext,
    handleBack,
    handleKeyPress,
    isStepValid,
    resetForm,
    totalSteps: steps.length,
    isLastStep: currentStep === steps.length - 1,
    currentStepData: steps[currentStep],
    handleStepChange,
  };
};