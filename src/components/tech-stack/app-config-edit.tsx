"use client";

import type { AppConfig } from "@/types/tech-stack";
import { Edit, Save } from "lucide-react";
import { useState } from "react";

interface AppConfigEditProps {
	config: AppConfig;
	onSave: (id: string, name: string, filePath: string) => void;
}

export function AppConfigEdit({ config, onSave }: AppConfigEditProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(config.name);
	const [filePath, setFilePath] = useState(config.filePath || "");

	const handleSave = () => {
		if (name.trim()) {
			onSave(config.id, name, filePath);
			setIsEditing(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSave();
		} else if (e.key === "Escape") {
			setIsEditing(false);
			setName(config.name);
			setFilePath(config.filePath || "");
		}
	};

	if (isEditing) {
		return (
			<div className="flex flex-col gap-2 p-2 border rounded-md">
				<div className="flex flex-col gap-1">
					<label
						htmlFor={`config-name-${config.id}`}
						className="text-xs text-muted-foreground"
					>
						Name
					</label>
					<input
						id={`config-name-${config.id}`}
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						onKeyDown={handleKeyDown}
						className="px-2 py-1 border rounded-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<label
						htmlFor={`config-path-${config.id}`}
						className="text-xs text-muted-foreground"
					>
						File Path
					</label>
					<input
						id={`config-path-${config.id}`}
						type="text"
						value={filePath}
						onChange={(e) => setFilePath(e.target.value)}
						onKeyDown={handleKeyDown}
						className="px-2 py-1 border rounded-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>
				<div className="flex justify-end gap-2 mt-1">
					<button
						type="button"
						onClick={() => {
							setIsEditing(false);
							setName(config.name);
							setFilePath(config.filePath || "");
						}}
						className="px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleSave}
						className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-md flex items-center gap-1"
					>
						<Save className="h-3 w-3" />
						Save
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-base font-medium flex items-center gap-2">
						{config.name}
						{config.isCommon && (
							<span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-secondary">
								Common
							</span>
						)}
						{config.isLocal && (
							<span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
								Local
							</span>
						)}
					</h3>
				</div>
				<button
					type="button"
					onClick={() => setIsEditing(true)}
					className="text-muted-foreground hover:text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
					title="Edit config"
				>
					<Edit className="h-4 w-4" />
				</button>
			</div>
			{config.filePath && (
				<span className="text-xs text-muted-foreground mt-1">
					{config.filePath}
				</span>
			)}
			<p className="text-sm text-muted-foreground mt-1">{config.description}</p>
		</div>
	);
}
