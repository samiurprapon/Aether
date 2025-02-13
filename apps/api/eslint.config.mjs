import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config({
	files: ['src/**/*.ts'],
	extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
	languageOptions: {
		parser: tseslint.parser,
		parserOptions: {
			project: './tsconfig.json', // Point to the tsconfig file for path resolution
			ecmaVersion: 2020,
			sourceType: 'module',
		},
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.ts'],
			},
			typescript: {
				project: './tsconfig.json',
			},
		},
	},
	plugins: {
		'@typescript-eslint': tseslint.plugin,
		import: importPlugin,
	},
	rules: {
		'import/default': 'off',
		'import/no-duplicates': ['error'],
		'import/no-named-as-default-member': 'off',
		'import/no-unresolved': 'error',
		'import/order': [
			'error',
			{
				groups: [
					['builtin', 'external'],
					['internal', 'index', 'sibling', 'parent', 'object'],
				],
				'newlines-between': 'always-and-inside-groups',
			},
		],
		'spaced-comment': 'warn',
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		'no-duplicate-imports': 'off',
		'no-multiple-empty-lines': ['error', { max: 1 }],
		camelcase: 'warn',
		'object-curly-spacing': ['error', 'always'],
		'require-await': 'off',
		'arrow-body-style': ['error', 'as-needed'],
		'no-case-declarations': 'warn',
		eqeqeq: 'error',
		quotes: ['warn', 'single'],

		'@typescript-eslint/await-thenable': 'error',
		'@typescript-eslint/require-await': 'error',
		'@typescript-eslint/no-unnecessary-condition': 'warn',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next|err' }],
		'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
		'@typescript-eslint/no-floating-promises': 'error',
		'@typescript-eslint/semi': ['warn'],
		'@typescript-eslint/member-delimiter-style': [
			'error',
			{
				multiline: {
					delimiter: 'semi',
					requireLast: true,
				},
				singleline: {
					delimiter: 'semi',
					requireLast: false,
				},
			},
		],
	},
	...importPlugin.flatConfigs.recommended,
	...prettierRecommended,
});
