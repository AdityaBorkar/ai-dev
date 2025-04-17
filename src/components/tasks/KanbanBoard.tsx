import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { Button } from "../ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import type { Task } from "./types";
import { TaskCard } from "./TaskCard";

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
			<Card className="mb-4 border-t-4" style={{ borderTopColor: color }}>
				<CardHeader className="py-2 px-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h2 className="text-sm font-medium">{title}</h2>
							<Badge variant="secondary" className="text-xs">
								{count}
							</Badge>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-6 w-6"
							aria-label={`Add task to ${title}`}
						>
							<Plus size={14} />
						</Button>
					</div>
				</CardHeader>
				<CardContent className="px-3 pb-3 pt-0">
					<div className="space-y-2">
						{tasks.map((task) => (
							<TaskCard key={task.id} task={task} onClick={onClick} />
						))}

						{tasks.length === 0 && (
							<div className="p-3 text-center text-muted-foreground text-sm border border-dashed border-gray-200 dark:border-gray-700 rounded-md">
								No tasks
							</div>
						)}
					</div>
				</CardContent>
			</Card>
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
					color="#6b7280" // gray-500
					count={todoTasks.length}
					onClick={handleTaskClick}
				/>
				<KanbanColumn
					title="In Progress"
					tasks={inProgressTasks}
					color="#3b82f6" // blue-500
					count={inProgressTasks.length}
					onClick={handleTaskClick}
				/>
				<KanbanColumn
					title="Done"
					tasks={doneTasks}
					color="#10b981" // emerald-500
					count={doneTasks.length}
					onClick={handleTaskClick}
				/>
			</div>
		</div>
	);
};
