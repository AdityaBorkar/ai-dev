import { z } from "zod";

export const ProjectOnboardingSchema = z.interface({
	projectName: z.string().min(1, "Project name is required."),
	description: z.string().optional(),
	themeColor: z
		.string()
		// .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid hex color")
		.optional()
		.default("#000000"),
	theme: z.enum(["light", "dark"]).default("light"),
	authorName: z.string().optional(),
	isMonorepo: z.enum(["yes", "no"]).default("no"),
	projectType: z.enum(["library", "project"]).default("project"),
	aiEditor: z.enum(["windsurf", "cursor", "github_copilot"]).default("cursor"),
	isBlank: z.enum(["blank", "not_blank"]).default("not_blank"),
});

export type ProjectOnboardingSchema = z.infer<typeof ProjectOnboardingSchema>;
