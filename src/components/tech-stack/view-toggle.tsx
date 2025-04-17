"use client";

import { cn } from "@/lib/utils";
import type { ViewMode } from "@/types/tech-stack";
import { LayoutGrid, Table } from "lucide-react";

interface ViewToggleProps {
	viewMode: ViewMode;
	onToggle: (mode: ViewMode) => void;
}

export function ViewToggle({ viewMode, onToggle }: ViewToggleProps) {
	return (
		<div className="flex border rounded-md overflow-hidden">
			<button
				type="button"
				onClick={() => onToggle("card")}
				className={cn(
					"flex items-center gap-2 px-3 py-2 transition-colors",
					viewMode === "card"
						? "bg-primary text-primary-foreground"
						: "hover:bg-accent",
				)}
			>
				<LayoutGrid className="h-4 w-4" />
				<span className="text-sm">Cards</span>
			</button>
			<button
				type="button"
				onClick={() => onToggle("table")}
				className={cn(
					"flex items-center gap-2 px-3 py-2 transition-colors",
					viewMode === "table"
						? "bg-primary text-primary-foreground"
						: "hover:bg-accent",
				)}
			>
				<Table className="h-4 w-4" />
				<span className="text-sm">Table</span>
			</button>
		</div>
	);
}
