"use client";

import { cn } from "@/lib/utils";
import {
	ChevronDownIcon,
	ChevronRightIcon,
	EditIcon,
	FileIcon,
	FolderIcon,
	FolderOpenIcon,
	MinusSquareIcon,
	PlusSquareIcon,
} from "lucide-react";
import { useState } from "react";

// Define TypeScript interfaces for our file structure
interface FileItem {
	id: string;
	name: string;
	type: "file";
	charCount: number;
	color: string;
}

interface DirectoryItem {
	id: string;
	name: string;
	type: "directory";
	charCount: number;
	color: string;
	children?: (FileItem | DirectoryItem)[];
}

type FileSystemItem = FileItem | DirectoryItem;

// Mock file structure - in a real app, this would come from an API or file system
const initialFileStructure: DirectoryItem = {
	id: "root",
	name: "project-root",
	type: "directory",
	charCount: 0,
	color: "bg-blue-100",
	children: [
		{
			id: "src",
			name: "src",
			type: "directory",
			charCount: 0,
			color: "bg-violet-100",
			children: [
				{
					id: "app",
					name: "app",
					type: "directory",
					charCount: 0,
					color: "bg-emerald-100",
					children: [
						{
							id: "page",
							name: "page.tsx",
							type: "file",
							charCount: 150,
							color: "bg-emerald-50",
						},
						{
							id: "layout",
							name: "layout.tsx",
							type: "file",
							charCount: 320,
							color: "bg-emerald-50",
						},
					],
				},
				{
					id: "components",
					name: "components",
					type: "directory",
					charCount: 0,
					color: "bg-amber-100",
					children: [
						{
							id: "ui",
							name: "ui",
							type: "directory",
							charCount: 0,
							color: "bg-amber-50",
							children: [
								{
									id: "button",
									name: "button.tsx",
									type: "file",
									charCount: 450,
									color: "bg-amber-50",
								},
							],
						},
					],
				},
			],
		},
		{
			id: "public",
			name: "public",
			type: "directory",
			charCount: 0,
			color: "bg-red-100",
			children: [
				{
					id: "favicon",
					name: "favicon.ico",
					type: "file",
					charCount: 1024,
					color: "bg-red-50",
				},
			],
		},
	],
};

// Calculate character counts for directories based on their children
const calculateCharCounts = (item: FileSystemItem): number => {
	if (item.type === "file") {
		return item.charCount;
	}

	let totalCount = 0;
	if (item.children) {
		for (const child of item.children) {
			child.charCount = calculateCharCounts(child);
			totalCount += child.charCount;
		}
	}

	return totalCount;
};

// Format character count with appropriate units
const formatCharCount = (count: number): string => {
	if (count < 1000) {
		return `${count} c`;
	}

	return count < 1000000
		? `${(count / 1000).toFixed(1)} kc`
		: `${(count / 1000000).toFixed(1)} Mc`;
};

export default function RepositoryStructure() {
	const [fileStructure, setFileStructure] = useState<DirectoryItem>(() => {
		const structure = JSON.parse(JSON.stringify(initialFileStructure));
		structure.charCount = calculateCharCounts(structure);
		return structure;
	});

	const [expandedItems, setExpandedItems] = useState<Set<string>>(
		new Set(["root", "src", "app", "components"]),
	);
	const [isPrototypingMode, setIsPrototypingMode] = useState<boolean>(false);
	const [notes, setNotes] = useState<Record<string, string>>({});
	const [showFiles, setShowFiles] = useState<boolean>(true);

	// Function to collect all directory IDs
	const getAllDirectoryIds = (item: FileSystemItem): string[] => {
		if (item.type === "file") {
			return [];
		}

		let ids = [item.id];
		if (item.children) {
			for (const child of item.children) {
				if (child.type === "directory") {
					ids = [...ids, ...getAllDirectoryIds(child)];
				}
			}
		}
		return ids;
	};

	// Expand or collapse all folders
	const expandCollapseAll = (expand: boolean) => {
		if (expand) {
			// Get all directory IDs
			const allDirIds = getAllDirectoryIds(fileStructure);
			setExpandedItems(new Set(allDirIds));
		} else {
			// Only keep the root expanded
			setExpandedItems(new Set(["root"]));
		}
	};

	const toggleExpand = (id: string): void => {
		const newExpandedItems = new Set(expandedItems);
		if (newExpandedItems.has(id)) {
			newExpandedItems.delete(id);
		} else {
			newExpandedItems.add(id);
		}
		setExpandedItems(newExpandedItems);
	};

	const togglePrototypingMode = (): void => {
		setIsPrototypingMode(!isPrototypingMode);
	};

	const addNote = (id: string, note: string): void => {
		setNotes({
			...notes,
			[id]: note,
		});
	};

	const addNewItem = (parentId: string, isFile: boolean): void => {
		const newStructure = JSON.parse(JSON.stringify(fileStructure));

		const findParent = (item: FileSystemItem): DirectoryItem | null => {
			if (item.id === parentId) {
				return item.type === "directory" ? item : null;
			}
			if (item.type === "directory" && item.children) {
				for (const child of item.children) {
					const found = findParent(child);
					if (found) return found;
				}
			}
			return null;
		};

		const parent = findParent(newStructure);
		if (!parent) return;

		if (!parent.children) {
			parent.children = [];
		}

		const newId = `new-${Date.now()}`;
		const newItem: FileSystemItem = isFile
			? {
					id: newId,
					name: "newfile.tsx",
					type: "file",
					charCount: 0,
					color: parent.color,
				}
			: {
					id: newId,
					name: "newfolder",
					type: "directory",
					charCount: 0,
					color: parent.color,
					children: [],
				};

		parent.children.push(newItem);
		if (!isFile) {
			setExpandedItems(new Set([...expandedItems, newId]));
		}

		newStructure.charCount = calculateCharCounts(newStructure);
		setFileStructure(newStructure);
	};

	const renderFileStructure = (item: FileSystemItem, level = 0) => {
		const isExpanded = expandedItems.has(item.id);
		const isDirectory = item.type === "directory";
		const indent = level * 16;

		// Skip files in prototyping mode if showFiles is false
		if (isPrototypingMode && !showFiles && !isDirectory) {
			return null;
		}

		return (
			<div key={item.id}>
				<button
					type="button"
					className={cn(
						"flex items-center w-full text-left py-1 px-2 hover:bg-gray-100 cursor-pointer rounded group",
						item.color,
					)}
					style={{ paddingLeft: `${indent}px` }}
					onClick={() => isDirectory && toggleExpand(item.id)}
					onKeyDown={() => isDirectory && toggleExpand(item.id)}
					disabled={!isDirectory}
				>
					<div className="flex-shrink-0 mr-1">
						{isDirectory ? (
							isExpanded ? (
								<ChevronDownIcon className="h-4 w-4" />
							) : (
								<ChevronRightIcon className="h-4 w-4" />
							)
						) : null}
					</div>

					<div className="flex-shrink-0 mr-1">
						{isDirectory ? (
							isExpanded ? (
								<FolderOpenIcon className="h-4 w-4 text-blue-500" />
							) : (
								<FolderIcon className="h-4 w-4 text-blue-500" />
							)
						) : (
							<FileIcon className="h-4 w-4 text-gray-500" />
						)}
					</div>

					<div className="flex-grow font-mono text-sm">{item.name}</div>

					<div className="text-xs text-gray-500 ml-2">
						{formatCharCount(item.charCount)}
					</div>

					{isPrototypingMode && (
						<div className="hidden group-hover:flex ml-2 space-x-1">
							{isDirectory && (
								<>
									<button
										type="button"
										className="p-1 rounded hover:bg-gray-200"
										onClick={(e) => {
											e.stopPropagation();
											addNewItem(item.id, false);
										}}
										title="Add folder"
									>
										<FolderIcon className="h-3 w-3" />
									</button>
									<button
										type="button"
										className="p-1 rounded hover:bg-gray-200"
										onClick={(e) => {
											e.stopPropagation();
											addNewItem(item.id, true);
										}}
										title="Add file"
									>
										<FileIcon className="h-3 w-3" />
									</button>
								</>
							)}
							<button
								type="button"
								className="p-1 rounded hover:bg-gray-200"
								onClick={(e) => {
									e.stopPropagation();
									const note = prompt(
										"Enter note for this item:",
										notes[item.id] || "",
									);
									if (note !== null) {
										addNote(item.id, note);
									}
								}}
								title="Add note"
							>
								<EditIcon className="h-3 w-3" />
							</button>
						</div>
					)}
				</button>

				{isPrototypingMode && notes[item.id] && (
					<div
						className="text-xs italic text-gray-600 pl-2 pr-2 py-1 border-l-2 border-gray-300 ml-6"
						style={{ marginLeft: `${indent + 24}px` }}
					>
						{notes[item.id]}
					</div>
				)}

				{isDirectory && isExpanded && item.children && (
					<div>
						{item.children.map((child: FileSystemItem) =>
							renderFileStructure(child, level + 1),
						)}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="">
			<div className="bg-white border rounded shadow-sm">
				<header className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between">
					<div className="text-sm font-medium">EXPLORER</div>
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<span className="text-xs">Show Files:</span>
							{/* TODO: Replace with ShadCN Toggle Component */}
							<button
								type="button"
								onClick={() => expandCollapseAll(true)}
								className="p-1 rounded hover:bg-gray-200"
								title="Expand all"
							>
								<PlusSquareIcon className="h-5 w-5" />
							</button>
							<button
								type="button"
								onClick={() => expandCollapseAll(false)}
								className="p-1 rounded hover:bg-gray-200"
								title="Collapse all"
							>
								<MinusSquareIcon className="h-5 w-5" />
							</button>
						</div>
						<div className="text-xs text-gray-500">
							Total: {formatCharCount(fileStructure.charCount)}
						</div>
					</div>
				</header>
				<div className="max-h-[600px] overflow-auto">
					{renderFileStructure(fileStructure)}
				</div>
			</div>
		</div>
	);
}
