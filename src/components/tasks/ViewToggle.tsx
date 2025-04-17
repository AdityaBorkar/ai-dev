import { Grid, List } from "lucide-react";
import type React from "react";

export type ViewMode = "list" | "board";

interface ViewToggleProps {
	viewMode: ViewMode;
	onChange: (mode: ViewMode) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
	viewMode,
	onChange,
}) => {
	return (
		<div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
			<button
				type="button"
				className={`flex items-center justify-center p-2 ${
					viewMode === "list"
						? "bg-white dark:bg-gray-700 shadow-sm"
						: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
				}`}
				onClick={() => onChange("list")}
				aria-pressed={viewMode === "list"}
				aria-label="List view"
			>
				<List size={16} />
			</button>
			<button
				type="button"
				className={`flex items-center justify-center p-2 ${
					viewMode === "board"
						? "bg-white dark:bg-gray-700 shadow-sm"
						: "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
				}`}
				onClick={() => onChange("board")}
				aria-pressed={viewMode === "board"}
				aria-label="Board view"
			>
				<Grid size={16} />
			</button>
		</div>
	);
};
