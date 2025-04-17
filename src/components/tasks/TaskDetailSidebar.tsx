import type React from "react";
import type { TaskDetail } from "./types";

interface TaskDetailSidebarProps {
	task: TaskDetail;
	onTaskUpdate?: (
		field: keyof TaskDetail,
		value: string | boolean | Date,
	) => void;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
	task,
	onTaskUpdate = () => {},
}) => {
	return (
		<div className="w-64 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
			<h2 className="text-sm font-medium text-gray-500 mb-3">Properties</h2>

			<div className="space-y-4">
				<div>
					<label htmlFor="status" className="block text-xs text-gray-500 mb-1">
						Status
					</label>
					<select
						id="status"
						className="w-full p-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
						value={task.status}
						onChange={(e) => onTaskUpdate("status", e.target.value)}
					>
						<option value="Todo">Todo</option>
						<option value="In Progress">In Progress</option>
						<option value="Done">Done</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="assignee"
						className="block text-xs text-gray-500 mb-1"
					>
						Assignee
					</label>
					<select
						id="assignee"
						className="w-full p-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
						value={task.assignee}
						onChange={(e) => onTaskUpdate("assignee", e.target.value)}
					>
						<option>John Doe</option>
						<option>Jane Smith</option>
						<option>Alex Johnson</option>
						<option>Sarah Williams</option>
						<option>Mike Brown</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="priority"
						className="block text-xs text-gray-500 mb-1"
					>
						Priority
					</label>
					<select
						id="priority"
						className="w-full p-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
						value={task.priority}
						onChange={(e) => onTaskUpdate("priority", e.target.value)}
					>
						<option value="High">High</option>
						<option value="Medium">Medium</option>
						<option value="Low">Low</option>
					</select>
				</div>

				<div>
					<label htmlFor="dueDate" className="block text-xs text-gray-500 mb-1">
						Due Date
					</label>
					<input
						id="dueDate"
						type="date"
						className="w-full p-1.5 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded"
						value={task.due}
						onChange={(e) => onTaskUpdate("due", e.target.value)}
					/>
				</div>

				<div>
					<label htmlFor="labels" className="block text-xs text-gray-500 mb-1">
						Labels
					</label>
					<div id="labels" className="flex flex-wrap gap-1 mt-1">
						<div className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full">
							Frontend
						</div>
						<div className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
							Authentication
						</div>
						<div className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full cursor-pointer hover:bg-gray-200">
							+ Add
						</div>
					</div>
				</div>
			</div>

			<div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
				<h2 className="text-sm font-medium text-gray-500 mb-3">Activity</h2>
				<div className="text-xs text-gray-500 space-y-2">
					<div>
						<span className="font-medium text-gray-700">John Doe</span> created
						this task
						<div className="text-gray-400 mt-0.5">{task.createdAt}</div>
					</div>
					<div>
						<span className="font-medium text-gray-700">Jane Smith</span>{" "}
						changed status to &quot;{task.status}&quot;
						<div className="text-gray-400 mt-0.5">Yesterday</div>
					</div>
				</div>
			</div>
		</div>
	);
};
