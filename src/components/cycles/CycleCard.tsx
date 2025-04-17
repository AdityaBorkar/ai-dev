"use client";

import { Card } from "@/components/ui/card";
import type { Cycle, CycleStatus } from "./types";
import { formatDate } from "./utils";
import { Progress } from "@/components/cycles/Progress";

interface CycleCardProps {
	cycle: Cycle;
	onSelect: (id: string) => void;
}

export function CycleCard({ cycle, onSelect }: CycleCardProps) {
	const getStatusColor = (status: CycleStatus) => {
		switch (status) {
			case "Not Started":
				return "bg-gray-200 text-gray-800";
			case "In Progress":
				return "bg-blue-100 text-blue-800";
			case "Completed":
				return "bg-green-100 text-green-800";
			case "Cancelled":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-200 text-gray-800";
		}
	};

	const statusColorClass = getStatusColor(cycle.status);

	return (
		<Card
			className="p-4 hover:shadow-md transition-all cursor-pointer border-l-4 hover:border-l-6 border-l-blue-500"
			onClick={() => onSelect(cycle.id)}
		>
			<div className="space-y-3">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-lg">{cycle.name}</h3>
					<span
						className={`text-xs px-2 py-1 rounded-full ${statusColorClass}`}
					>
						{cycle.status}
					</span>
				</div>

				<p className="text-sm text-gray-600 line-clamp-2">
					{cycle.description}
				</p>

				<div className="text-xs text-gray-500 flex justify-between">
					<span>
						{formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
					</span>
					<span>{cycle.tasks.length} tasks</span>
				</div>

				<div className="pt-2">
					<Progress
						percent={cycle.progress.percentComplete}
						tasksStatus={cycle.progress.tasksStatus}
					/>
				</div>

				{cycle.roadblocks.some((rb) => rb.status === "Active") && (
					<div className="flex items-center mt-2">
						<div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
						<span className="text-xs text-red-600">
							{cycle.roadblocks.filter((rb) => rb.status === "Active").length}{" "}
							active roadblock(s)
						</span>
					</div>
				)}
			</div>
		</Card>
	);
}
