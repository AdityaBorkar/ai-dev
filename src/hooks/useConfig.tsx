export default function useConfig() {
	const config = {
		configPath: ".ai",
		workspace: {
			name: "AI Developer",
			ide: "cursor",
		},
		paths: {
			cycles: "/cycles",
			tasks: "/tasks",
			prd: "/prd",
		},
	};

	// TODO: Sync stores using websockets / SSE.

	return config;
}
