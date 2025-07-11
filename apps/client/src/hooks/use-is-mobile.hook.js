import { useLayoutEffect, useState } from "react";
import debounce from "lodash/debounce";

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useLayoutEffect(() => {
		const updateMobileState = () => {
			if (typeof window !== "undefined" && window.matchMedia) {
				const isNarrowScreen = window.innerWidth < 768;

				const mobileQueries = ["(pointer: coarse)", "(hover: none)"];

				const isMobileByQuery = mobileQueries.some(
					(query) => window.matchMedia(query).matches
				);

				const isDevToolsEmulator =
					window.navigator.webdriver ||
					window.chrome?.runtime?.onConnect ||
					window.outerHeight === 0 ||
					(/Chrome\/\d+/.test(navigator.userAgent) && window.innerWidth < 768);

				const isMobileDevice =
					isNarrowScreen || (isMobileByQuery && !isDevToolsEmulator);

				setIsMobile(isMobileDevice);
			} else {
				setIsMobile(window.innerWidth < 768);
			}
		};

		updateMobileState();

		const debouncedUpdate = debounce(updateMobileState, 250);

		window.addEventListener("resize", debouncedUpdate);

		window.addEventListener("orientationchange", debouncedUpdate);

		return () => {
			window.removeEventListener("resize", debouncedUpdate);
			window.removeEventListener("orientationchange", debouncedUpdate);
		};
	}, []);

	return isMobile;
};

export default useIsMobile;