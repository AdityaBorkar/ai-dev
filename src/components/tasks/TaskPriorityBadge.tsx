import type React from "react";
import { getPriorityColor } from "./utils";

interface TaskPriorityBadgeProps {
	priority: string;
}

export const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({
	priority,
}) => {
	return (
		<span className={`text-sm font-medium ${getPriorityColor(priority)}`}>
			{priority}
		</span>
	);
};
