"use client";

import { type ReactNode, createContext, useContext, useState } from "react";

export type StyleConfig = {
	id: string;
	name: string;
	isCommon: boolean;
	colors: string;
	typography: string;
	iconography: string;
	designSystem: string;
	animations: string;
	cssStrategy: string;
};

const defaultConfigs: StyleConfig[] = [
	{
		id: "common",
		name: "Common Style Config",
		isCommon: true,
		colors: "<h2>Colors</h2><p>Define your color palette here.</p>",
		typography: "<h2>Typography</h2><p>Define your typography system here.</p>",
		iconography: "<h2>Iconography</h2><p>Define your iconography here.</p>",
		designSystem:
			"<h2>Component Library / Design System</h2><p>Define your design system here.</p>",
		animations:
			"<h2>Transitions and Animations</h2><p>Define your animations here.</p>",
		cssStrategy: "<h2>CSS Strategy</h2><p>Define your CSS strategy here.</p>",
	},
	{
		id: "app1",
		name: "App 1 Style Config",
		isCommon: false,
		colors: "<h2>Colors</h2><p>App 1 specific colors.</p>",
		typography: "<h2>Typography</h2><p>App 1 specific typography.</p>",
		iconography: "<h2>Iconography</h2><p>App 1 specific iconography.</p>",
		designSystem:
			"<h2>Component Library / Design System</h2><p>App 1 specific design system.</p>",
		animations:
			"<h2>Transitions and Animations</h2><p>App 1 specific animations.</p>",
		cssStrategy: "<h2>CSS Strategy</h2><p>App 1 specific CSS strategy.</p>",
	},
	{
		id: "app2",
		name: "App 2 Style Config",
		isCommon: false,
		colors: "<h2>Colors</h2><p>App 2 specific colors.</p>",
		typography: "<h2>Typography</h2><p>App 2 specific typography.</p>",
		iconography: "<h2>Iconography</h2><p>App 2 specific iconography.</p>",
		designSystem:
			"<h2>Component Library / Design System</h2><p>App 2 specific design system.</p>",
		animations:
			"<h2>Transitions and Animations</h2><p>App 2 specific animations.</p>",
		cssStrategy: "<h2>CSS Strategy</h2><p>App 2 specific CSS strategy.</p>",
	},
];

interface StyleConfigContextType {
	configs: StyleConfig[];
	updateConfig: (
		id: string,
		field: keyof Omit<StyleConfig, "id" | "name" | "isCommon">,
		content: string,
	) => void;
	addConfig: (name: string) => void;
	deleteConfig: (id: string) => void;
}

const StyleConfigContext = createContext<StyleConfigContextType | undefined>(
	undefined,
);

export function StyleConfigProvider({ children }: { children: ReactNode }) {
	const [configs, setConfigs] = useState<StyleConfig[]>(defaultConfigs);

	const updateConfig = (
		id: string,
		field: keyof Omit<StyleConfig, "id" | "name" | "isCommon">,
		content: string,
	) => {
		setConfigs((prevConfigs) =>
			prevConfigs.map((config) =>
				config.id === id ? { ...config, [field]: content } : config,
			),
		);
	};

	const addConfig = (name: string) => {
		const newConfig: StyleConfig = {
			id: `app-${Date.now()}`,
			name,
			isCommon: false,
			colors: "<h2>Colors</h2><p>Define your color palette here.</p>",
			typography:
				"<h2>Typography</h2><p>Define your typography system here.</p>",
			iconography: "<h2>Iconography</h2><p>Define your iconography here.</p>",
			designSystem:
				"<h2>Component Library / Design System</h2><p>Define your design system here.</p>",
			animations:
				"<h2>Transitions and Animations</h2><p>Define your animations here.</p>",
			cssStrategy: "<h2>CSS Strategy</h2><p>Define your CSS strategy here.</p>",
		};

		setConfigs((prevConfigs) => [...prevConfigs, newConfig]);
	};

	const deleteConfig = (id: string) => {
		if (id === "common") return; // Prevent deletion of common config
		setConfigs((prevConfigs) =>
			prevConfigs.filter((config) => config.id !== id),
		);
	};

	return (
		<StyleConfigContext.Provider
			value={{ configs, updateConfig, addConfig, deleteConfig }}
		>
			{children}
		</StyleConfigContext.Provider>
	);
}

export function useStyleConfig() {
	const context = useContext(StyleConfigContext);

	if (context === undefined) {
		throw new Error("useStyleConfig must be used within a StyleConfigProvider");
	}

	return context;
}
