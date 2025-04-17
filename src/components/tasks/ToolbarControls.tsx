import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import type React from "react";
import { type ViewMode, ViewToggle } from "./ViewToggle";

interface ToolbarControlsProps {
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
	onShowFilterPanel: () => void;
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

export const ToolbarControls: React.FC<ToolbarControlsProps> = ({
	viewMode,
	onViewModeChange,
	onShowFilterPanel,
	searchQuery,
	setSearchQuery,
}) => {
	return (
		<div className="border-b border-gray-200 dark:border-gray-800 px-4 py-2 flex justify-between items-center">
			<div className="flex items-center gap-4">
				<button
					type="button"
					className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
					onClick={onShowFilterPanel}
				>
					<Filter size={16} />
					<span>Filter</span>
				</button>

				<div className="relative max-w-xs">
					<Search
						size={16}
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
					/>
					<input
						type="text"
						placeholder="Search tasks..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="pl-9 pr-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 w-full"
					/>
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex flex-col items-end">
					<div className="text-sm text-gray-600 dark:text-gray-300">
						Display
					</div>
					<div className="flex gap-2 mt-1">
						<ViewToggle viewMode={viewMode} onChange={onViewModeChange} />

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
							>
								<SlidersHorizontal size={16} />
								<span>Columns</span>
								<ChevronDown size={14} />
							</button>
						</div>

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
							>
								<span>No grouping</span>
								<ChevronDown size={14} />
							</button>
						</div>

						<div className="relative">
							<button
								type="button"
								className="flex items-center gap-1 text-sm px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded"
							>
								<span>Priority</span>
								<ChevronDown size={14} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
