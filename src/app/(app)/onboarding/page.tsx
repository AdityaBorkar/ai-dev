"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function OnboardingPage() {
	// TODO: Add state management (e.g., react-hook-form) and submit logic
	const [theme, setTheme] = useState("light");
	const [isMonorepo, setIsMonorepo] = useState("no");
	const [projectType, setProjectType] = useState("project");
	const [isBlank, setIsBlank] = useState("not_blank");
	const [aiEditor, setAiEditor] = useState("cursor");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Gather form data and submit
		console.log("Form submitted");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-sm"
			>
				<h1 className="text-2xl font-semibold text-card-foreground">
					Project Onboarding
				</h1>

				<div className="space-y-2">
					<Label htmlFor="projectName">Project Name</Label>
					<Input id="projectName" placeholder="My Awesome Project" required />
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Description</Label>
					<Textarea id="description" placeholder="Describe your project..." />
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label htmlFor="themeColor">Theme Color</Label>
						{/* Basic color input, could be replaced with a custom picker */}
						<Input
							id="themeColor"
							type="color"
							defaultValue="#000000"
							className="h-10 w-full"
						/>
					</div>
					<div className="space-y-2">
						<Label>Theme</Label>
						<RadioGroup
							defaultValue="light"
							value={theme}
							onValueChange={setTheme}
							className="flex items-center space-x-4 pt-2"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="light" id="light" />
								<Label htmlFor="light">Light</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="dark" id="dark" />
								<Label htmlFor="dark">Dark</Label>
							</div>
						</RadioGroup>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="authorName">Author Name</Label>
					<Input id="authorName" placeholder="Ada Lovelace" />
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Monorepo?</Label>
						<RadioGroup
							defaultValue="no"
							value={isMonorepo}
							onValueChange={setIsMonorepo}
							className="flex items-center space-x-4 pt-2"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="yes" id="mono-yes" />
								<Label htmlFor="mono-yes">Yes</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="no" id="mono-no" />
								<Label htmlFor="mono-no">No</Label>
							</div>
						</RadioGroup>
					</div>
					<div className="space-y-2">
						<Label>Type</Label>
						<RadioGroup
							defaultValue="project"
							value={projectType}
							onValueChange={setProjectType}
							className="flex items-center space-x-4 pt-2"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="library" id="type-lib" />
								<Label htmlFor="type-lib">Library</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="project" id="type-proj" />
								<Label htmlFor="type-proj">Project</Label>
							</div>
						</RadioGroup>
					</div>
				</div>

				<div className="space-y-2">
					<Label htmlFor="aiEditor">Choose AI Editor</Label>
					<Select value={aiEditor} onValueChange={setAiEditor}>
						<SelectTrigger id="aiEditor">
							<SelectValue placeholder="Select AI Editor" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="windsurf">Windsurf</SelectItem>
							<SelectItem value="cursor">Cursor</SelectItem>
							<SelectItem value="github_copilot">GitHub Copilot</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<Label>Start with</Label>
					<RadioGroup
						defaultValue="not_blank"
						value={isBlank}
						onValueChange={setIsBlank}
						className="flex items-center space-x-4 pt-2"
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="blank" id="start-blank" />
							<Label htmlFor="start-blank">Blank Project</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="not_blank" id="start-not-blank" />
							<Label htmlFor="start-not-blank">Template</Label>
						</div>
					</RadioGroup>
				</div>

				<Button type="submit" className="w-full">
					Complete Onboarding
				</Button>
			</form>
		</div>
	);
}
