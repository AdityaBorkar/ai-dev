import { MoreHorizontal } from "lucide-react";
import React from "react";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { Task } from "./types";

interface TaskCardProps {
	task: Task;
	onClick: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" || e.key === " ") {
			onClick(task.id);
		}
	};

	return (
		<button
			className="w-full text-left bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 p-3 mb-2 cursor-pointer hover:shadow-md transition-shadow"
			onClick={() => onClick(task.id)}
			onKeyDown={handleKeyDown}
			type="button"
			aria-label={`Open task ${task.id}: ${task.title}`}
		>
			<div className="flex justify-between items-start mb-2">
				<span className="text-xs text-gray-500 font-mono">{task.id}</span>
				<button
					type="button"
					className="text-gray-400 hover:text-gray-600"
					onClick={(e) => {
						e.stopPropagation();
						// Handle options menu
					}}
				>
					<MoreHorizontal size={14} />
				</button>
			</div>

			<h3 className="font-medium text-sm mb-2">{task.title}</h3>

			<div className="flex justify-between items-center mt-2">
				<TaskPriorityBadge priority={task.priority} />
				<div className="text-xs text-gray-500 flex items-center">
					<span className="inline-block w-4 h-4 bg-gray-200 rounded-full mr-1 overflow-hidden">
						{/* User initials or avatar could go here */}
						{task.assignee.charAt(0)}
					</span>
					<span>{task.due}</span>
				</div>
			</div>
		</button>
	);
};
