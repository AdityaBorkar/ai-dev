import { Calendar, Check, Clock, Tag, User } from "lucide-react";
import type React from "react";
import { useState } from "react";
import type { TaskDetail } from "./types";
import { getPriorityColor, getStatusColor } from "./utils";

interface TaskDetailContentProps {
	task: TaskDetail;
	onSubtaskToggle?: (subtaskId: string, completed: boolean) => void;
	onAddComment?: (comment: string) => void;
}

export const TaskDetailContent: React.FC<TaskDetailContentProps> = ({
	task,
	onSubtaskToggle = () => {},
	onAddComment = () => {},
}) => {
	const [newComment, setNewComment] = useState("");

	const handleCommentSubmit = () => {
		if (newComment.trim()) {
			onAddComment(newComment);
			setNewComment("");
		}
	};

	return (
		<div className="flex-grow overflow-y-auto p-6 border-r border-gray-200 dark:border-gray-800">
			{/* Status and metadata */}
			<div className="mb-6 flex flex-wrap gap-4">
				<div className="flex items-center gap-2">
					<div
						className={`px-3 py-1 text-sm rounded-full ${getStatusColor(task.status)}`}
					>
						{task.status}
					</div>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<Calendar size={14} />
					<span className="text-sm">Created on {task.createdAt}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<Clock size={14} />
					<span className="text-sm">Due {task.due}</span>
				</div>
				<div className="flex items-center gap-2 text-gray-500">
					<User size={14} />
					<span className="text-sm">{task.assignee}</span>
				</div>
				<div className="flex items-center gap-2">
					<Tag size={14} className={getPriorityColor(task.priority)} />
					<span
						className={`text-sm font-medium ${getPriorityColor(task.priority)}`}
					>
						{task.priority}
					</span>
				</div>
			</div>

			{/* Description */}
			<div className="mb-8">
				<h2 className="text-sm font-medium text-gray-500 mb-2">Description</h2>
				<div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
					<p className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-line">
						{task.description}
					</p>
				</div>
			</div>

			{/* Subtasks */}
			<div className="mb-8">
				<h2 className="text-sm font-medium text-gray-500 mb-2">Subtasks</h2>
				<div className="space-y-2">
					{task.subtasks.map((subtask) => (
						<div
							key={subtask.id}
							className="flex items-start gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md"
						>
							<div className="flex items-center mt-0.5 relative">
								<input
									type="checkbox"
									id={`subtask-${subtask.id}`}
									checked={subtask.completed}
									onChange={() =>
										onSubtaskToggle(subtask.id, !subtask.completed)
									}
									className={`w-4 h-4 rounded-sm border appearance-none ${
										subtask.completed
											? "bg-indigo-600 border-indigo-600"
											: "border-gray-300 dark:border-gray-700"
									}`}
								/>
								{subtask.completed && (
									<Check
										size={12}
										className="text-white absolute pointer-events-none ml-0.5"
									/>
								)}
							</div>
							<label
								htmlFor={`subtask-${subtask.id}`}
								className={`text-sm ${
									subtask.completed
										? "line-through text-gray-400"
										: "text-gray-800 dark:text-gray-200"
								}`}
							>
								{subtask.title}
							</label>
						</div>
					))}

					<div className="flex items-center gap-2 p-2 text-gray-400 hover:text-gray-600 cursor-pointer">
						<div className="w-4 h-4 rounded-sm border border-dashed border-gray-300 dark:border-gray-700" />
						<span className="text-sm">Add subtask...</span>
					</div>
				</div>
			</div>

			{/* Comments */}
			<div>
				<h2 className="text-sm font-medium text-gray-500 mb-2">Comments</h2>
				<div className="space-y-4 mb-4">
					{task.comments.map((comment) => (
						<div
							key={comment.id}
							className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md"
						>
							<div className="flex justify-between mb-1">
								<span className="text-sm font-medium">{comment.author}</span>
								<span className="text-xs text-gray-500">
									{comment.timestamp}
								</span>
							</div>
							<p className="text-sm text-gray-800 dark:text-gray-200">
								{comment.content}
							</p>
						</div>
					))}
				</div>

				{/* New comment form */}
				<div className="mt-4">
					<textarea
						className="w-full p-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
						rows={2}
						placeholder="Add a comment..."
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					></textarea>
					<div className="mt-2 flex justify-end">
						<button
							type="button"
							className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
							disabled={!newComment.trim()}
							onClick={handleCommentSubmit}
						>
							Comment
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
