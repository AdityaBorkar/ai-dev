import { Filter } from "lucide-react";
import type React from "react";
import type { ColumnFiltersState } from "./types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "./utils";

interface TasksFilterProps {
	columnFilters: ColumnFiltersState;
	setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
}

export const TasksFilter: React.FC<TasksFilterProps> = ({
	columnFilters,
	setColumnFilters,
}) => {
	const statusFilter =
		(columnFilters.find((f) => f.id === "status")?.value as string) || "all";
	const priorityFilter =
		(columnFilters.find((f) => f.id === "priority")?.value as string) || "all";

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setColumnFilters((prev) => {
			// Remove the existing status filter if it exists
			const filtered = prev.filter((f) => f.id !== "status");

			// Only add the filter if it's not "all"
			if (value !== "all") {
				return [...filtered, { id: "status", value }];
			}

			return filtered;
		});
	};

	const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;

		setColumnFilters((prev) => {
			// Remove the existing priority filter if it exists
			const filtered = prev.filter((f) => f.id !== "priority");

			// Only add the filter if it's not "all"
			if (value !== "all") {
				return [...filtered, { id: "priority", value }];
			}

			return filtered;
		});
	};

	return (
		<div className="flex items-center gap-4 px-4 py-2 border-b border-gray-200 dark:border-gray-800">
			<div className="flex items-center gap-1">
				<Filter size={16} className="text-gray-500" />
				<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
					Filters:
				</span>
			</div>

			<div className="flex items-center gap-2">
				<select
					className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5"
					value={statusFilter}
					onChange={handleStatusChange}
					aria-label="Filter by status"
				>
					{STATUS_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<select
					className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1.5"
					value={priorityFilter}
					onChange={handlePriorityChange}
					aria-label="Filter by priority"
				>
					{PRIORITY_OPTIONS.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
