import { selectPreferences, setPreferences } from "@/features/auth/state/slices/auth.slice.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const themeModes = Object.freeze({
	SYSTEM: "system",
	LIGHT: "light",
	DARK: "dark",
});
const validThemeModes = Object.freeze(Object.values(themeModes));

export function useTheme() {
	const mode = useSelector(selectPreferences);
	const dispatch = useDispatch();

	if (mode === undefined || !validThemeModes.includes(mode)) {
		throw new Error("useTheme must be used within a Auth State")
	}

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(themeModes.LIGHT, themeModes.DARK);

		if (mode === "system") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

			const handleChange = () => {
				const systemThemeMode = mediaQuery.matches ? themeModes.DARK : themeModes.LIGHT;
				root.classList.remove(themeModes.LIGHT, themeModes.DARK);
				root.classList.add(systemThemeMode);
			};

			mediaQuery.addEventListener("change", handleChange);
			handleChange();

			return () => mediaQuery.removeEventListener("change", handleChange);
		}

		root.classList.add(mode);
	}, [mode]);

	return {
		theme: mode,
		setTheme: (newMode) => dispatch(setPreferences(newMode)),
	}
}
