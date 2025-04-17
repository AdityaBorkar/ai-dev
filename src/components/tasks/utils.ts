import type { PriorityOption, StatusOption } from "./types";

// Status color utility
export const getStatusColor = (status: string): string => {
	switch (status) {
		case "Todo":
			return "bg-gray-200 text-gray-800";
		case "In Progress":
			return "bg-blue-100 text-blue-800";
		case "Done":
			return "bg-green-100 text-green-800";
		default:
			return "bg-gray-200 text-gray-800";
	}
};

// Priority color utility
export const getPriorityColor = (priority: string): string => {
	switch (priority) {
		case "High":
			return "text-red-600";
		case "Medium":
			return "text-yellow-600";
		case "Low":
			return "text-green-600";
		default:
			return "text-gray-600";
	}
};

// Filter options
export const STATUS_OPTIONS: StatusOption[] = [
	{ value: "all", label: "All Tasks" },
	{ value: "Todo", label: "Todo" },
	{ value: "In Progress", label: "In Progress" },
	{ value: "Done", label: "Done" },
];

export const PRIORITY_OPTIONS: PriorityOption[] = [
	{ value: "all", label: "All Priorities" },
	{ value: "High", label: "High" },
	{ value: "Medium", label: "Medium" },
	{ value: "Low", label: "Low" },
];
