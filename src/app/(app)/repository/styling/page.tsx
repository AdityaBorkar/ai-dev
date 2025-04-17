"use client";

// TODO: Run `bunx shadcn-ui@latest add card input button` to install these components
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

// TODO: Fetch actual style configs from backend
const initialAppConfigs = [
	{ id: "1", name: "Default App" },
	{ id: "2", name: "Marketing Site" },
];

// TODO: Implement actual TipTap editor component
function TipTapEditorPlaceholder({ configName }: { configName: string }) {
	const sections = [
		"Colors",
		"Typography",
		"Iconography",
		"Component Library / Design System",
		"Transitions and Animation Library and Animation Definitions",
		"CSS Strategy",
	];

	return (
		<div className="prose prose-sm max-w-none border rounded-md p-4 min-h-[200px] bg-background">
			{/* This is a placeholder for the TipTap editor */}
			<p className="text-muted-foreground">
				TipTap editor for {configName}. Add content for the following sections:
			</p>
			<ul className="list-disc pl-5 text-muted-foreground">
				{sections.map((section) => (
					<li key={section}>{section}</li>
				))}
			</ul>
			{/* Actual editor content would go here */}
		</div>
	);
}

export default function RepositoryStyling() {
	// TODO: Replace with actual state management/fetching logic
	const [appConfigs, setAppConfigs] = useState(initialAppConfigs);
	const [newConfigName, setNewConfigName] = useState("");

	const handleAddConfig = () => {
		if (newConfigName.trim()) {
			const newConfig = {
				id: Date.now().toString(), // Temporary ID generation
				name: newConfigName.trim(),
			};
			setAppConfigs([...appConfigs, newConfig]);
			setNewConfigName("");
			// TODO: Persist new config to backend
		}
	};

	const handleDeleteConfig = (id: string) => {
		setAppConfigs(appConfigs.filter((config) => config.id !== id));
		// TODO: Delete config from backend
	};

	return (
		<div className="space-y-8">
			<h1 className="text-3xl font-bold">Repository Styling</h1>

			{/* Common Style Config */}
			{/* TODO: Replace this div with Shadcn Card component after installing */}
			<div className="border rounded-lg shadow-sm bg-card text-card-foreground">
				<div className="p-6 space-y-1">
					<h3 className="text-2xl font-semibold leading-none tracking-tight">
						Common Style Configuration
					</h3>
				</div>
				<div className="p-6 pt-0">
					{/* TODO: Add editor/controls for Common Style Config */}
					<p className="text-muted-foreground">
						Define base styles, tokens, or settings shared across all app
						configurations. (Editor Placeholder)
					</p>
					<div className="prose prose-sm max-w-none border rounded-md p-4 min-h-[150px] bg-background mt-4">
						Common Style Editor Placeholder
					</div>
				</div>
			</div>

			{/* App Style Configs */}
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h2 className="text-2xl font-semibold">App Style Configurations</h2>
					<div className="flex gap-2 items-center">
						{/* TODO: Replace this input with Shadcn Input component after installing */}
						<input
							type="text"
							placeholder="New app config name"
							className="flex h-10 w-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							value={newConfigName}
							onChange={(e) => setNewConfigName(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleAddConfig()}
						/>
						{/* TODO: Replace this button with Shadcn Button component after installing */}
						<button
							type="button"
							onClick={handleAddConfig}
							disabled={!newConfigName.trim()}
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
						>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add Config
						</button>
					</div>
				</div>

				{appConfigs.length === 0 ? (
					<p className="text-muted-foreground text-center py-4">
						No app style configurations defined yet. Add one above.
					</p>
				) : (
					appConfigs.map((config) => (
						// TODO: Replace this div with Shadcn Card component after installing
						<div
							key={config.id}
							className="relative group border rounded-lg shadow-sm bg-card text-card-foreground"
						>
							{/* TODO: Replace this button with Shadcn Button component after installing */}
							<button
								type="button"
								className="absolute top-4 right-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
								onClick={() => handleDeleteConfig(config.id)}
							>
								<Trash2 className="h-4 w-4" />
								<span className="sr-only">Delete {config.name}</span>
							</button>
							<div className="p-6 space-y-1">
								<h3 className="text-2xl font-semibold leading-none tracking-tight">
									{config.name}
								</h3>
							</div>
							<div className="p-6 pt-0">
								<TipTapEditorPlaceholder configName={config.name} />
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}
