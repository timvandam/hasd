module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'@typescript-eslint/no-empty-interface': 'warn', // fine for naming purposes
		'@typescript-eslint/no-extra-semi': 'warn', // prettier isn't perfect, so this is needed sometimes
	},
}
