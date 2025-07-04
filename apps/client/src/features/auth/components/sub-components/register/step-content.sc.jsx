const StepContent = ({
	title,
	description,
	titleSize = "text-4xl md:text-5xl",
	descriptionSize = "text-xl",
}) => {
	return (
		<div className="mb-6 overflow-hidden">
			<h1 className={`mb-4 font-light text-foreground ${titleSize}`}>
				{title}
			</h1>
			<p className={`text-muted-foreground ${descriptionSize}`}>
				{description}
			</p>
		</div>
	);
};

export default StepContent;
