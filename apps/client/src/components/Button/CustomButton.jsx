"use client";
import PropTypes from "prop-types";

const CustomButton = ({
	text,
	icon,
	iconPosition = "left",  
	onClick,
	type = "button",
	variant = "primary",
	size = "medium",
	disabled = false,
	className = "",
	width,
	height,
	...props
}) => {
	// Base clipped corner style
	const clipPathStyle = {
		clipPath:
			"polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))",
		borderRadius: "0",
		width: typeof width === "number" ? `${width}px` : width,
		height: typeof height === "number" ? `${height}px` : height,
	};

	// Variant styles using Tailwind classes that reference your theme
	const variants = {
		primary:
			"bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90",
		secondary:
			"bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/80",
		accent:
			"bg-accent text-accent-foreground border-2 border-accent hover:bg-accent/80",
		destructive:
			"bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90",
		muted:
			"bg-muted text-muted-foreground border-2 border-muted hover:bg-muted/80",
	};

	// Size styles
	const sizes = {
		small: "px-4 py-2 text-sm",
		medium: "px-6 py-3 text-base",
		large: "px-8 py-4 text-lg",
		xl: "px-10 py-5 text-xl",
	};

	const buttonClasses = `
		${sizes[size]}
		${variants[variant]}
		font-medium
		inline-flex
		items-center
		justify-center
		gap-2
		focus:outline-none
		focus:ring-2
		focus:ring-offset-2
		focus:ring-ring
		transition-all
		duration-200
		disabled:opacity-50
		disabled:cursor-not-allowed
		${className}
	`
		.trim()
		.replace(/\s+/g, " ");

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			style={clipPathStyle}
			className={buttonClasses}
			{...props}
		>
			{icon && iconPosition === "left" && (
				<span className="flex-shrink-0">{icon}</span>
			)}
			{text && <span>{text}</span>}
			{icon && iconPosition === "right" && (
				<span className="flex-shrink-0">{icon}</span>
			)}
		</button>
	);
};

CustomButton.propTypes = {
	text: PropTypes.string,
	icon: PropTypes.node,
	iconPosition: PropTypes.oneOf(["left", "right"]),
	onClick: PropTypes.func,
	type: PropTypes.oneOf(["button", "submit", "reset"]),
	variant: PropTypes.oneOf([
		"primary",
		"secondary",
		"accent",
		"destructive",
		"muted",
	]),
	size: PropTypes.oneOf(["small", "medium", "large", "xl"]),
	disabled: PropTypes.bool,
	className: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomButton;
