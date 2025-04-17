import type React from "react";
import { getStatusColor } from "./utils";

interface TaskStatusBadgeProps {
	status: string;
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
	return (
		<span
			className={`px-2 py-1 text-xs rounded-full ${getStatusColor(status)}`}
		>
			{status}
		</span>
	);
};
