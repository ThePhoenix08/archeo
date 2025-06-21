// @ts-nocheck
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import boundaries from "eslint-plugin-boundaries";
import importPlugin from "eslint-plugin-import";

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
			importPlugin
		},
		settings: {
			"boundaries/source": "src",
			"boundaries/elements": [
				{
					mode: "full",
					type: "shared",
					pattern: [
						"src/hooks/**/*",
						"src/components/**/*",
						"src/shared/**/*",
						"src/lib/**/*"
					],
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
					"pattern": [
						"App.css",
						"App.jsx",
						"main.jsx",
						"index.css",
					],
				}
			],
			'import/resolver': {
				alias: {
					map: [['@', './src']],
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"boundaries/no-unknown": ['error'],
			"boundaries/external": [2, { default: "allow" }],
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
							allow: ["shared", "app", "feature"],
						},
						{
							from: ["feature"],
							allow: ["shared", ["feature", { featureName: "${from.featureName}" }]],
						},
					],
				},
			],
			'no-restricted-imports': [
				'error',
				{
					paths: [],
					patterns: ['../*', './*'], // restricts deep relative imports
				},
			],
		},
	},
];
