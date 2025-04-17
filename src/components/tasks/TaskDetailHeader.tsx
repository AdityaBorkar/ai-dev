import { ArrowLeft, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import type React from "react";
import type { TaskDetail } from "./types";

interface TaskDetailHeaderProps {
	task: TaskDetail;
}

export const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({ task }) => {
	return (
		<div className="border-b border-gray-200 dark:border-gray-800 py-4 px-6 flex justify-between items-center">
			<div className="flex items-center gap-3">
				<Link
					href="/tasks"
					className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<ArrowLeft size={18} />
				</Link>
				<h1 className="text-xl font-semibold">
					{task.id}: {task.title}
				</h1>
			</div>
			<div className="flex items-center gap-2">
				<button
					type="button"
					className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<MoreHorizontal size={18} />
				</button>
			</div>
		</div>
	);
};
