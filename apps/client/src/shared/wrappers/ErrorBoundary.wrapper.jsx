"use client";

import { Component } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ENVS } from "@/shared/constants/env.constant.js";
import { Link } from "react-router";
import { ROUTES } from "@/shared/constants/routes.constant.js";
import LogoText from "@/components/brand/LogoText.sc.jsx";
import useIsMobile from "@/hooks/use-is-mobile.hook.js";

export class CustomErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		console.error("CustomErrorBoundary caught an error:", error, errorInfo);

		if (this.props.onError) {
			this.props.onError(error, errorInfo);
		}
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return <GlobalError
        error={this.state.error}
        handleReset={this.handleReset}
      />;
		}

		return this.props.children;
	}
}

export default CustomErrorBoundary;

const GlobalError = ({
  error,
  handleReset,
}) => {
  const isMobile = useIsMobile();

	return (
		<div className="relative min-h-screen bg-background">
			{/* Logo/Brand Section */}
			<div className="w-full focus:outline-none">
				<div className="box pt-4 pl-4">
					<LogoText />
				</div>
			</div>

			{/* Main Content */}
			<div className="mx-auto max-w-4xl px-6 py-2">
				{/* Error Title and Description */}
				<div className="mb-8 text-center">
					<div className="mb-6 flex justify-center">
						<div className="rounded-full bg-destructive/10 p-4">
							<AlertTriangle className="h-12 w-12 text-destructive" />
						</div>
					</div>

					<h1 className="mb-4 text-4xl font-bold text-foreground">
						Component Error
					</h1>
					<p className="text-lg text-muted-foreground">
						A component encountered an error and couldn't render properly.
					</p>
				</div>

				{/* Error Details (Development Only) */}
				{ENVS.DEV_MODE && error && !isMobile && (
					<div className="mb-8 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
						<h3 className="mb-2 font-semibold text-destructive">
							Development Error Details:
						</h3>
						<div className="rounded bg-background p-3">
							<pre className="text-xs text-muted-foreground">
								{error.message}
								{error.stack && (
									<>
										{"\n\n"}
										{error.stack}
									</>
								)}
							</pre>
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className="space-y-4">
					<div className="pt-2">
						<Button
							onClick={handleReset}
							size="lg"
							className="w-full px-8 py-4 text-xl font-medium"
							style={{
								clipPath:
									"polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
							}}
						>
							<RefreshCw className="mr-2 h-5 w-5" />
							Try Again
						</Button>
					</div>

					<div>
						<Link to={ROUTES.DASHBOARD} className="block">
							<Button
								variant="outline"
								size="lg"
								className="w-full bg-transparent px-8 py-4 text-lg font-medium"
								style={{
									clipPath:
										"polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
								}}
							>
								<Home className="mr-2 h-5 w-5" />
								Go to Homepage
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
