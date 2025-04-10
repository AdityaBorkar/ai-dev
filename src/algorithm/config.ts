import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";
import { type } from "arktype";

const CONFIG_FILE_NAME = "ai-dev.config.json";

const CONFIG_SCHEMA = type({
	name: "string > 1",
	description: "string > 1",
	aiEditor: "'cursor' | 'github-copilot' | 'windsurf'",
	paths: {
		cycles: "string > 1",
		tasks: "string > 1",
		prd: "string > 1",
	},
	web: {
		host: "string > 1",
		port: "number > 0",
		theme: {
			name: "string > 1",
			color: "string > 1",
		},
	},
});

export type Config = typeof CONFIG_SCHEMA.infer;

export function getConfig() {
	const path = cwd();
	const configPath = join(path, CONFIG_FILE_NAME);
	const exists = existsSync(configPath);
	if (!exists) return null;

	const configText = readFileSync(configPath, "utf8");
	const configJson = JSON.parse(configText);
	const config = CONFIG_SCHEMA(configJson);
	// TODO: Throw Validation Errors
	return config;
}

function getDefaultConfig(basePath: string) {
	// const config = getDefaultConfig(path);
	// TODO: If not exists create file
	const packageJson = readFileSync(join(basePath, "package.json"), "utf8");
	const pkg = JSON.parse(packageJson);
	return {
		// name: pkg.name,
		// description: pkg.description,
		// aiEditor: "cursor",
		paths: {
			cycles: ".ai/cycles",
			tasks: ".ai/tasks",
			prd: ".ai/prd",
		},
		web: {
			host: "localhost",
			port: 4100,
			// theme: {
			// 	name: "light",
			// 	color: "#000000",
			// },
		},
	};
}
