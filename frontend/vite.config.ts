import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

const REQUIRED_ENV_VARS = [];

// Load environment variables based on the current mode
function loadEnv({ mode }: { mode?: string }) {
	if (mode) {
		dotenv.config();
	}
}

// Function to validate environment variables
function validateEnvVars() {
	if (REQUIRED_ENV_VARS.length > 0) {
		const missingVars = REQUIRED_ENV_VARS.filter(key => !process.env[key]);

		if (missingVars.length > 0) {
			throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
		}
	}
}

export default defineConfig(({ mode }) => {
	// Load and validate environment variables for the current mode
	loadEnv({ mode });
	validateEnvVars();

	return {
		plugins: [react()],
		resolve: {
			alias: {
				'~': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: 'modern-compiler',
				},
			},
		},
	};
});
