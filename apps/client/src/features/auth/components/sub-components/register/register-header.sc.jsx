import React from "react";

const Header = ({
	logoText = "A",
	brandName = "Archeo",
	showSignIn = true,
	signInText = "Already have an account?",
	signInLink = "Sign in",
	onSignInClick,
}) => {
	return (
		<div className="border-b border-gray-200 bg-white">
			<div className="mx-auto max-w-7xl px-6 py-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
							<span className="text-lg font-bold text-white">{logoText}</span>
						</div>
						<span className="text-2xl font-bold text-gray-900">
							{brandName}
						</span>
					</div>
					{showSignIn && (
						<div className="text-sm text-gray-600">
							{signInText}
							<a
								href="#"
								onClick={onSignInClick}
								className="ml-2 font-medium text-green-600 hover:text-green-700"
							>
								{signInLink}
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
