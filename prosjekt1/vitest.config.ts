import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true, // Enable Vitest globals like `expect`
		setupFiles: "./src/test/setup.ts", // Path to your setup file
		environment: "jsdom", // JSDOM is the default environment
	},
});
