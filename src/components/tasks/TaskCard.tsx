import { MoreHorizontal } from "lucide-react";
import type React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import type { Task } from "./types";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";

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

	// Calculate days remaining for due date
	const dueDate = new Date(task.due);
	const today = new Date();
	const daysRemaining = Math.ceil(
		(dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
	);
	const isOverdue = daysRemaining < 0;

	return (
		<Card
			className="w-full cursor-pointer hover:shadow-md transition-all border-l-4 hover:translate-y-[-2px]"
			style={{
				borderLeftColor:
					task.status === "Done"
						? "hsl(var(--success))"
						: task.status === "In Progress"
							? "hsl(var(--info))"
							: "hsl(var(--muted))",
			}}
			onClick={() => onClick(task.id)}
			onKeyDown={handleKeyDown}
			tabIndex={0}
			aria-label={`Open task ${task.id}: ${task.title}`}
		>
			<CardHeader className="py-2 px-3">
				<div className="flex justify-between items-start">
					<Badge variant="outline" className="text-xs font-mono">
						{task.id}
					</Badge>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-6 w-6"
									onClick={(e) => {
										e.stopPropagation();
										// Handle options menu
									}}
								>
									<MoreHorizontal size={14} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Task options</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardHeader>

			<CardContent className="py-1 px-3">
				<h3 className="font-medium text-sm">{task.title}</h3>
			</CardContent>

			<CardFooter className="py-2 px-3 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<TaskPriorityBadge priority={task.priority} />
					{isOverdue && (
						<Badge variant="destructive" className="text-[10px]">
							Overdue
						</Badge>
					)}
				</div>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="text-xs text-muted-foreground flex items-center">
								<div className="inline-flex items-center justify-center w-5 h-5 bg-secondary rounded-full mr-1 text-xs">
									{task.assignee.charAt(0)}
								</div>
								<span>
									{isOverdue
										? `${Math.abs(daysRemaining)}d late`
										: daysRemaining === 0
											? "Today"
											: `${daysRemaining}d left`}
								</span>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								Assigned to: {task.assignee}
								<br />
								Due: {task.due}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</CardFooter>
		</Card>
	);
};
