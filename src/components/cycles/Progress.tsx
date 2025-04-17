"use client";

interface ProgressProps {
	percent: number;
	tasksStatus: {
		todo: number;
		inProgress: number;
		done: number;
		blocked: number;
	};
}

export function Progress({ percent, tasksStatus }: ProgressProps) {
	const total =
		tasksStatus.todo +
		tasksStatus.inProgress +
		tasksStatus.done +
		tasksStatus.blocked;

	const getPercentage = (value: number) => {
		return total > 0 ? (value / total) * 100 : 0;
	};

	return (
		<div className="space-y-1">
			<div className="flex justify-between items-center text-xs">
				<span className="font-medium">{percent}% complete</span>
				<span className="text-gray-500">
					{tasksStatus.done}/{total} tasks
				</span>
			</div>

			<div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
				{/* Stacked bars for different task statuses */}
				<div className="flex h-full">
					{/* Done tasks (green) */}
					{tasksStatus.done > 0 && (
						<div
							className="bg-green-500 h-full"
							style={{ width: `${getPercentage(tasksStatus.done)}%` }}
						/>
					)}

					{/* In Progress tasks (blue) */}
					{tasksStatus.inProgress > 0 && (
						<div
							className="bg-blue-500 h-full"
							style={{ width: `${getPercentage(tasksStatus.inProgress)}%` }}
						/>
					)}

					{/* Blocked tasks (red) */}
					{tasksStatus.blocked > 0 && (
						<div
							className="bg-red-500 h-full"
							style={{ width: `${getPercentage(tasksStatus.blocked)}%` }}
						/>
					)}

					{/* Todo tasks (light gray, rendered by the background) */}
				</div>
			</div>

			{/* Legend */}
			<div className="flex gap-4 text-xs text-gray-600">
				{tasksStatus.done > 0 && (
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 bg-green-500 rounded-full" />
						<span>Done ({tasksStatus.done})</span>
					</div>
				)}

				{tasksStatus.inProgress > 0 && (
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 bg-blue-500 rounded-full" />
						<span>In Progress ({tasksStatus.inProgress})</span>
					</div>
				)}

				{tasksStatus.blocked > 0 && (
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 bg-red-500 rounded-full" />
						<span>Blocked ({tasksStatus.blocked})</span>
					</div>
				)}

				{tasksStatus.todo > 0 && (
					<div className="flex items-center gap-1">
						<div className="w-2 h-2 bg-gray-300 rounded-full" />
						<span>Todo ({tasksStatus.todo})</span>
					</div>
				)}
			</div>
		</div>
	);
}
