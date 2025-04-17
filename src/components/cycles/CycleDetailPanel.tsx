"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Cycle } from "./types";
import {
	formatDate,
	formatTokens,
	getDaysRemaining,
	getStatusColorClass,
} from "./utils";
import { Progress } from "./Progress";
import { Badge } from "@/components/ui/badge";
import { OverviewCard } from "@/components/cycles/OverviewCard";
import { RoadblocksList } from "@/components/cycles/RoadblocksList";
import { TasksTable } from "@/components/cycles/TasksTable";

interface CycleDetailPanelProps {
	cycle: Cycle;
	onClose: () => void;
}

export function CycleDetailPanel({ cycle, onClose }: CycleDetailPanelProps) {
	const { days, isOverdue } = getDaysRemaining(cycle.endDate);
	const statusClass = getStatusColorClass(cycle.status);

	return (
		<div className="h-full flex flex-col overflow-hidden">
			{/* Header */}
			<div className="p-4 border-b flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<button
						type="button"
						onClick={onClose}
						className="text-gray-500 hover:text-gray-700"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="15 18 9 12 15 6"></polyline>
						</svg>
					</button>
					<h2 className="text-xl font-semibold">{cycle.name}</h2>
					<span className={`text-xs px-2 py-1 rounded-full ${statusClass}`}>
						{cycle.status}
					</span>
				</div>

				<div className="text-sm text-gray-500">
					{formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
					{cycle.status === "In Progress" && (
						<span
							className={`ml-2 ${isOverdue ? "text-red-600" : "text-green-600"}`}
						>
							({isOverdue ? "Overdue by" : "Days left:"} {days})
						</span>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 overflow-auto p-4">
				<Tabs defaultValue="overview" className="w-full">
					<TabsList className="mb-4">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="tasks">Tasks</TabsTrigger>
						<TabsTrigger value="details">Details</TabsTrigger>
						<TabsTrigger value="roadblocks">
							Roadblocks
							{cycle.roadblocks.some((rb) => rb.status === "Active") && (
								<span className="ml-1 w-2 h-2 bg-red-500 rounded-full inline-block"></span>
							)}
						</TabsTrigger>
					</TabsList>

					<TabsContent value="overview" className="space-y-4">
						<div className="mb-4">
							<h3 className="text-lg font-medium mb-2">Progress</h3>
							<Progress
								percent={cycle.progress.percentComplete}
								tasksStatus={cycle.progress.tasksStatus}
							/>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<OverviewCard
								title="Tasks"
								value={`${cycle.progress.completedTasks}/${cycle.progress.totalTasks}`}
								description="Tasks completed"
								icon="tasks"
							/>

							<OverviewCard
								title="Tokens"
								value={formatTokens(cycle.tokensConsumed)}
								description="Tokens consumed"
								icon="tokens"
							/>

							<OverviewCard
								title="Duration"
								value={`${Math.ceil((new Date(cycle.endDate).getTime() - new Date(cycle.startDate).getTime()) / (1000 * 60 * 60 * 24))} days`}
								description={
									cycle.status === "In Progress"
										? isOverdue
											? "Overdue"
											: "Remaining"
										: "Total"
								}
								icon="calendar"
								status={isOverdue ? "negative" : "positive"}
							/>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">Description</h3>
							<p className="text-gray-700">{cycle.description}</p>
						</div>

						{cycle.roadblocks.some((rb) => rb.status === "Active") && (
							<div>
								<h3 className="text-lg font-medium mb-2 text-red-600">
									Active Roadblocks
								</h3>
								<RoadblocksList
									roadblocks={cycle.roadblocks.filter(
										(rb) => rb.status === "Active",
									)}
								/>
							</div>
						)}
					</TabsContent>

					<TabsContent value="tasks">
						<TasksTable tasks={cycle.tasks} />
					</TabsContent>

					<TabsContent value="details" className="space-y-4">
						<div>
							<h3 className="text-lg font-medium mb-2">
								Additional Instructions
							</h3>
							<p className="text-gray-700">
								{cycle.additionalInstructions ||
									"No additional instructions provided."}
							</p>
						</div>

						{cycle.integrationTests && cycle.integrationTests.length > 0 && (
							<div>
								<h3 className="text-lg font-medium mb-2">Integration Tests</h3>
								<ul className="list-disc pl-5 space-y-1">
									{cycle.integrationTests.map((test, index) => (
										<li key={index} className="text-gray-700">
											{test}
										</li>
									))}
								</ul>
							</div>
						)}

						<div className="flex gap-2">
							<Badge variant={cycle.writeTests ? "default" : "outline"}>
								{cycle.writeTests ? "✓ Write Tests" : "× Write Tests"}
							</Badge>
							<Badge variant={cycle.writeDocumentation ? "default" : "outline"}>
								{cycle.writeDocumentation
									? "✓ Write Documentation"
									: "× Write Documentation"}
							</Badge>
						</div>

						{cycle.changelog && (
							<div>
								<h3 className="text-lg font-medium mb-2">Changelog</h3>
								<p className="text-gray-700">{cycle.changelog}</p>
							</div>
						)}
					</TabsContent>

					<TabsContent value="roadblocks">
						<RoadblocksList roadblocks={cycle.roadblocks} />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
