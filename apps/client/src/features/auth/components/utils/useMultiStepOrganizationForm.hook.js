// useMultiStepOrganizationForm.hook.js - Modified for category view
import { useState, useEffect } from "react";

export const useMultiStepOrganizationForm = (
	categories,
	initialFormData = {},
	initialChecklist = {},
	customValidation = {}
) => {
	const [currentCategory, setCurrentCategory] = useState(0);
	const [direction, setDirection] = useState("forward");
	const [formData, setFormData] = useState(() => {
		const defaultData = {};
		categories.forEach((category) => {
			category.fields.forEach((field) => {
				defaultData[field.field] = field.field === "address" ? [] : "";
			});
		});
		return { ...defaultData, ...initialFormData };
	});

	const [checklist, setChecklist] = useState(() => {
		const defaultChecklist = {};
		categories.forEach((category) => {
			defaultChecklist[category.checklistKey] = false;
		});
		return { ...defaultChecklist, ...initialChecklist };
	});

	// Get current category data
	const currentCategoryData = categories[currentCategory];
	const totalCategories = categories.length;

	// Calculate progress based on categories
	const progress = {
		overall: Math.round(((currentCategory + 1) / totalCategories) * 100),
		category: 100, // Always 100% since we show all fields in category
	};

	const handleInputChange = (fieldName, value) => {
		setFormData((prev) => ({
			...prev,
			[fieldName]: value,
		}));
	};

	// Update category completion whenever formData changes
	useEffect(() => {
		updateCategoryCompletion(currentCategory);
	}, [formData, currentCategory]);

	const updateCategoryCompletion = (categoryIndex) => {
		const category = categories[categoryIndex];
		const isCompleted = category.fields.every((field) => {
			const value = formData[field.field];

			// Skip validation for non-required fields
			if (!field.customData?.required) {
				return true;
			}

			// Handle different field types
			if (Array.isArray(value)) {
				return value.length > 0;
			}

			if (typeof value === "string") {
				const trimmedValue = value.trim();

				// Check minimum length
				if (
					field.customData?.minLength &&
					trimmedValue.length < field.customData.minLength
				) {
					return false;
				}

				// Email validation
				if (field.field === "email" && trimmedValue) {
					const emailRegex =
						/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
					return emailRegex.test(trimmedValue);
				}

				// Phone validation
				if (field.field === "phonenumber" && trimmedValue) {
					const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
					return phoneRegex.test(trimmedValue);
				}

				// URL validation
				if (field.field === "website" && trimmedValue) {
					try {
						new URL(trimmedValue);
						return true;
					} catch {
						return false;
					}
				}

				return trimmedValue !== "";
			}

			return value !== "" && value !== null && value !== undefined;
		});

		setChecklist((prev) => ({
			...prev,
			[category.checklistKey]: isCompleted,
		}));
	};

	const isFieldValid = (fieldData) => {
		if (!fieldData) return false;

		const value = formData[fieldData.field];

		// Check if field is required
		if (fieldData.customData?.required && !value) {
			return false;
		}

		// Handle different field types
		if (Array.isArray(value)) {
			return fieldData.customData?.required ? value.length > 0 : true;
		}

		if (typeof value === "string") {
			const trimmedValue = value.trim();

			// Check minimum length
			if (
				fieldData.customData?.minLength &&
				trimmedValue.length < fieldData.customData.minLength
			) {
				return false;
			}

			// Check maximum length
			if (
				fieldData.customData?.maxLength &&
				trimmedValue.length > fieldData.customData.maxLength
			) {
				return false;
			}

			// Email validation
			if (fieldData.field === "email" && trimmedValue) {
				const emailRegex =
					/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
				return emailRegex.test(trimmedValue);
			}

			// Phone validation
			if (fieldData.field === "phonenumber" && trimmedValue) {
				const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
				return phoneRegex.test(trimmedValue);
			}

			// URL validation
			if (fieldData.field === "website" && trimmedValue) {
				try {
					new URL(trimmedValue);
					return true;
				} catch {
					return false;
				}
			}
		}

		// Check custom validation
		if (customValidation[fieldData.field]) {
			return customValidation[fieldData.field](value, formData);
		}

		return true;
	};

	const areAllCategoryFieldsValid = () => {
		return currentCategoryData.fields.every((field) => {
			// Skip validation for non-required empty fields
			const value = formData[field.field];
			if (
				!field.customData?.required &&
				(!value || (typeof value === "string" && value.trim() === ""))
			) {
				return true;
			}
			return isFieldValid(field);
		});
	};

	const handleNext = () => {
		if (!areAllCategoryFieldsValid()) return;

		const isLastCategory = currentCategory === categories.length - 1;

		setDirection("forward");

		if (!isLastCategory) {
			setCurrentCategory((prev) => prev + 1);
		}
	};

	const handleBack = () => {
		setDirection("backward");

		if (currentCategory > 0) {
			setCurrentCategory((prev) => prev - 1);
		}
	};

	const handleCategoryChange = (categoryIndex) => {
		if (
			categoryIndex < 0 ||
			categoryIndex >= categories.length ||
			categoryIndex === currentCategory
		) {
			return;
		}

		// Allow going to any category (you might want to restrict this based on completion)
		setDirection(categoryIndex > currentCategory ? "forward" : "backward");
		setCurrentCategory(categoryIndex);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && areAllCategoryFieldsValid()) {
			const isLastCategory = currentCategory === categories.length - 1;

			if (isLastCategory) {
				return true; // Indicate form should be submitted
			} else {
				handleNext();
			}
		}
		return false;
	};

	const isCurrentCategoryCompleted = () => {
		return checklist[currentCategoryData.checklistKey];
	};

	const handleSubmit = () => {
		// Update all category completions before submitting
		categories.forEach((_, index) => {
			updateCategoryCompletion(index);
		});

		return {
			formData,
			checklist,
			isValid: categories.every((category) => checklist[category.checklistKey]),
		};
	};

	const resetForm = () => {
		setCurrentCategory(0);
		setDirection("forward");

		const defaultData = {};
		categories.forEach((category) => {
			category.fields.forEach((field) => {
				defaultData[field.field] = field.field === "address" ? [] : "";
			});
		});
		setFormData({ ...defaultData, ...initialFormData });

		const defaultChecklist = {};
		categories.forEach((category) => {
			defaultChecklist[category.checklistKey] = false;
		});
		setChecklist({ ...defaultChecklist, ...initialChecklist });
	};

	return {
		currentCategory,
		direction,
		formData,
		checklist,
		handleInputChange,
		handleNext,
		handleBack,
		handleKeyPress,
		isFieldValid,
		areAllCategoryFieldsValid,
		isCurrentCategoryCompleted,
		resetForm,
		totalCategories,
		currentCategoryData,
		handleCategoryChange,
		handleSubmit,
		progress,
		isLastCategory: currentCategory === categories.length - 1,
	};
};
