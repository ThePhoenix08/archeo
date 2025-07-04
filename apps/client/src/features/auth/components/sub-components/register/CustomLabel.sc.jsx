import { cloneElement } from "react";

const CustomLabel = ({ text, icon }) => {
	return (
		// {/* Label with Icon */}
		<div className="my-2 flex items-center space-x-3 px-2">
			<div
				className="bg-background p-2 text-primary"
				style={{
					clipPath:
						"polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))",
				}}
			>
				{cloneElement(icon, { className: "h-5 w-5" })}
			</div>
			<span className="text-xl font-bold text-primary-foreground">{text}</span>
		</div>
	);
};
export default CustomLabel;
