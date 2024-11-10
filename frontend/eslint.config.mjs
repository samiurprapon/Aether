import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist', 'node_modules'] },
	{
		extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
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
			...reactHooks.configs.recommended.rules,

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
		...prettierRecommended,
	},
);
