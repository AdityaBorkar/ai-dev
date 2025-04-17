import { Search } from "lucide-react";
import type React from "react";

interface TasksSearchProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TasksSearch: React.FC<TasksSearchProps> = ({
	searchQuery,
	setSearchQuery,
}) => {
	return (
		<div className="relative flex-grow max-w-md">
			<Search
				size={16}
				className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
			/>
			<input
				type="text"
				placeholder="Search tasks..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="w-full pl-9 pr-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
			/>
		</div>
	);
};
