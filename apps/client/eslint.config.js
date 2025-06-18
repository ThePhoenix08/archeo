import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import boundaries from "eslint-plugin-boundaries";

export default [
	{ ignores: ["dist"] },
	js.configs.recommended,
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			globals: globals.browser,
			sourceType: "module",
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			boundaries,
		},
		settings: {
			"boundaries/include": ["src/**/*"],
			"boundaries/elements": [
				{
					mode: "full",
					type: "shared",
					pattern: ["src/hooks/**/*", "src/components/**/*", "src/shared/**/*"],
				},
				{
					mode: "full",
					type: "feature",
					capture: ["featureName"],
					pattern: ["src/features/*/**/*"],
				},
				{
					mode: "full",
					type: "app",
					"pattern": ["src/*"],
				}
			],
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"boundaries/no-unknown": ["error"],
			"boundaries/no-unknown-files": ["error"],
			"boundaries/element-types": [
				"error",
				{
					default: "disallow",
					rules: [
						{
							from: ["shared"],
							allow: ["shared"],
						},
						{
							from: ["app"],
							allow: ["shared", "app", { fileName: "*.css" }, "feature"],
						},
						{
							from: ["feature"],
							allow: ["shared", ["feature", { featureName: "${from.featureName}" }]],
						},
					],
				},
			],
		},
	},
];
