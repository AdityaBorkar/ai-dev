import { atom } from "jotai";

// Types
type Label = {
	name: string;
	color:
		| "red"
		| "blue"
		| "green"
		| "yellow"
		| "purple"
		| "pink"
		| "indigo"
		| "cyan"
		| "amber"
		| "orange"
		| "violet"
		| "emerald";
};

type PackageCategory =
	| "Testing"
	| "Hosting"
	| "Frontend"
	| "Backend"
	| "DevOps"
	| "Utilities"
	| "Other";

type Package = {
	name: string;
	version: string;
	labels: Label[];
	docLink?: string;
	lastUpdated: Date;
	category: PackageCategory;
};

type MonorepoApp = {
	name: string;
	description: string;
	path: string;
	packages: Package[];
};

// Mock data
const projects: MonorepoApp[] = [
	{
		name: "$Root",
		path: "app/repository",
		description: "Outside the context of apps",
		packages: [
			{
				name: "react",
				version: "18.2.0",
				labels: [{ name: "UI", color: "blue" }],
				docLink: "https://reactjs.org/docs",
				lastUpdated: new Date("2023-05-15"),
				category: "Frontend",
			},
			{
				name: "tailwindcss",
				version: "3.3.3",
				labels: [{ name: "CSS", color: "cyan" }],
				docLink: "https://tailwindcss.com/docs",
				lastUpdated: new Date("2023-06-20"),
				category: "Frontend",
			},
			{
				name: "jest",
				version: "29.6.2",
				labels: [{ name: "Critical", color: "red" }],
				docLink: "https://jestjs.io/docs",
				lastUpdated: new Date("2023-04-10"),
				category: "Testing",
			},
			{
				name: "vercel",
				version: "32.1.0",
				labels: [{ name: "Production", color: "green" }],
				docLink: "https://vercel.com/docs",
				lastUpdated: new Date("2023-07-05"),
				category: "Hosting",
			},
		],
	},
	{
		name: "web-app",
		path: "/app/...",
		description: "Web App",
		packages: [
			{
				name: "react",
				version: "18.2.0",
				labels: [{ name: "UI", color: "blue" }],
				docLink: "https://reactjs.org/docs",
				lastUpdated: new Date("2023-05-15"),
				category: "Frontend",
			},
			{
				name: "tailwindcss",
				version: "3.3.3",
				labels: [{ name: "CSS", color: "cyan" }],
				docLink: "https://tailwindcss.com/docs",
				lastUpdated: new Date("2023-06-20"),
				category: "Frontend",
			},
			{
				name: "jest",
				version: "29.6.2",
				labels: [{ name: "Critical", color: "red" }],
				docLink: "https://jestjs.io/docs",
				lastUpdated: new Date("2023-04-10"),
				category: "Testing",
			},
			{
				name: "vercel",
				version: "32.1.0",
				labels: [{ name: "Production", color: "green" }],
				docLink: "https://vercel.com/docs",
				lastUpdated: new Date("2023-07-05"),
				category: "Hosting",
			},
		],
	},
	{
		name: "API Service",
		path: "/app/...",
		description: "API Service",
		packages: [
			{
				name: "express",
				version: "4.18.2",
				labels: [{ name: "Server", color: "purple" }],
				docLink: "https://expressjs.com/",
				lastUpdated: new Date("2023-03-18"),
				category: "Backend",
			},
			{
				name: "prisma",
				version: "5.1.1",
				labels: [
					{ name: "ORM", color: "indigo" },
					{ name: "Critical", color: "red" },
				],
				docLink: "https://www.prisma.io/docs",
				lastUpdated: new Date("2023-07-20"),
				category: "Backend",
			},
			{
				name: "typescript",
				version: "5.1.6",
				labels: [{ name: "Language", color: "blue" }],
				docLink: "https://www.typescriptlang.org/docs",
				lastUpdated: new Date("2023-06-15"),
				category: "DevOps",
			},
			{
				name: "supertest",
				version: "6.3.3",
				labels: [{ name: "Testing", color: "amber" }],
				docLink: "https://github.com/visionmedia/supertest#readme",
				lastUpdated: new Date("2023-05-12"),
				category: "Testing",
			},
		],
	},
	{
		name: "Mobile App",
		path: "/app/...",
		description: "Mobile App",
		packages: [
			{
				name: "react-native",
				version: "0.72.3",
				labels: [
					{ name: "Core", color: "blue" },
					{ name: "Mobile", color: "orange" },
				],
				docLink: "https://reactnative.dev/docs",
				lastUpdated: new Date("2023-07-10"),
				category: "Frontend",
			},
			{
				name: "expo",
				version: "49.0.5",
				labels: [{ name: "Framework", color: "violet" }],
				docLink: "https://docs.expo.dev/",
				lastUpdated: new Date("2023-07-15"),
				category: "Frontend",
			},
			{
				name: "detox",
				version: "20.7.0",
				labels: [{ name: "E2E", color: "amber" }],
				docLink: "https://wix.github.io/Detox/",
				lastUpdated: new Date("2023-06-30"),
				category: "Testing",
			},
			{
				name: "app-center",
				version: "5.0.0",
				labels: [{ name: "CI/CD", color: "emerald" }],
				docLink: "https://docs.microsoft.com/en-us/appcenter/",
				lastUpdated: new Date("2023-04-25"),
				category: "DevOps",
			},
		],
	},
];

const workspace = {
	name: "My Workspace",
	vcs: "git",
	repo: "github",
	monorepo: "bun",
};

export const ProjectsAtom = atom(projects);

export const WorkspaceAtom = atom(workspace);
