import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { TaskCard } from "./TaskCard";
import type { Task } from "./types";

interface KanbanColumnProps {
	title: string;
	tasks: Task[];
	color: string;
	count: number;
	onClick: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
	title,
	tasks,
	color,
	count,
	onClick,
}) => {
	return (
		<div className="w-full lg:w-1/3 px-2">
			<div className="mb-4">
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<div className={`w-4 h-4 rounded-full ${color}`} />
						<h2 className="text-sm font-medium">{title}</h2>
						<span className="text-xs bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-gray-500">
							{count}
						</span>
					</div>
					<button
						type="button"
						className="text-gray-400 hover:text-gray-600 p-1"
						aria-label={`Add task to ${title}`}
					>
						<Plus size={14} />
					</button>
				</div>
			</div>
			<div className="space-y-2">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} onClick={onClick} />
				))}

				{tasks.length === 0 && (
					<div className="p-3 text-center text-gray-400 text-sm border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
						No tasks
					</div>
				)}
			</div>
		</div>
	);
};

interface KanbanBoardProps {
	tasks: Task[];
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks }) => {
	const router = useRouter();

	const handleTaskClick = (id: string) => {
		router.push(`/tasks/${id}`);
	};

	const todoTasks = tasks.filter((task) => task.status === "Todo");
	const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
	const doneTasks = tasks.filter((task) => task.status === "Done");

	return (
		<div className="flex-1 overflow-x-auto">
			<div className="min-w-full flex flex-wrap -mx-2 p-4">
				<KanbanColumn
					title="Todo"
					tasks={todoTasks}
					color="bg-gray-400"
					count={todoTasks.length}
					onClick={handleTaskClick}
				/>
				<KanbanColumn
					title="In Progress"
					tasks={inProgressTasks}
					color="bg-blue-400"
					count={inProgressTasks.length}
					onClick={handleTaskClick}
				/>
				<KanbanColumn
					title="Done"
					tasks={doneTasks}
					color="bg-green-400"
					count={doneTasks.length}
					onClick={handleTaskClick}
				/>
			</div>
		</div>
	);
};
