"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { CycleTask } from "./types";
import { useState } from "react";

interface TasksTableProps {
	tasks: CycleTask[];
}

export function TasksTable({ tasks }: TasksTableProps) {
	const [sortColumn, setSortColumn] = useState<keyof CycleTask>("title");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const handleSort = (column: keyof CycleTask) => {
		if (sortColumn === column) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const getStatusColorClass = (status: string) => {
		switch (status) {
			case "Todo":
				return "bg-gray-100 text-gray-800";
			case "In Progress":
				return "bg-blue-100 text-blue-800";
			case "Done":
				return "bg-green-100 text-green-800";
			case "Blocked":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const sortedTasks = [...tasks].sort((a, b) => {
		const aValue = a[sortColumn];
		const bValue = b[sortColumn];

		if (aValue === undefined || bValue === undefined) return 0;

		if (typeof aValue === "string" && typeof bValue === "string") {
			return sortDirection === "asc"
				? aValue.localeCompare(bValue)
				: bValue.localeCompare(aValue);
		}

		// For number comparisons
		if (typeof aValue === "number" && typeof bValue === "number") {
			return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
		}

		return 0;
	});

	const renderSortIcon = (column: keyof CycleTask) => {
		if (sortColumn !== column) return null;

		return sortDirection === "asc" ? (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="ml-1"
			>
				<polyline points="18 15 12 9 6 15"></polyline>
			</svg>
		) : (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="ml-1"
			>
				<polyline points="6 9 12 15 18 9"></polyline>
			</svg>
		);
	};

	const calculateEfficiency = (estimated?: number, actual?: number) => {
		if (!estimated || !actual) return null;

		const efficiency = (estimated / actual) * 100;

		if (efficiency >= 100) {
			return { value: `${Math.round(efficiency)}%`, class: "text-green-600" };
		} else if (efficiency >= 80) {
			return { value: `${Math.round(efficiency)}%`, class: "text-yellow-600" };
		} else {
			return { value: `${Math.round(efficiency)}%`, class: "text-red-600" };
		}
	};

	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer"
							onClick={() => handleSort("title")}
						>
							Title {renderSortIcon("title")}
						</TableHead>
						<TableHead
							className="cursor-pointer w-[120px]"
							onClick={() => handleSort("status")}
						>
							Status {renderSortIcon("status")}
						</TableHead>
						<TableHead>Assignee</TableHead>
						<TableHead className="text-right">Estimated</TableHead>
						<TableHead className="text-right">Actual</TableHead>
						<TableHead className="text-right">Efficiency</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{sortedTasks.length > 0 ? (
						sortedTasks.map((task) => {
							const efficiency = calculateEfficiency(
								task.estimatedHours,
								task.actualHours,
							);

							return (
								<TableRow key={task.id}>
									<TableCell className="font-medium">{task.title}</TableCell>
									<TableCell>
										<span
											className={`text-xs px-2 py-1 rounded-full ${getStatusColorClass(task.status)}`}
										>
											{task.status}
										</span>
									</TableCell>
									<TableCell>{task.assignee || "-"}</TableCell>
									<TableCell className="text-right">
										{task.estimatedHours ? `${task.estimatedHours}h` : "-"}
									</TableCell>
									<TableCell className="text-right">
										{task.actualHours ? `${task.actualHours}h` : "-"}
									</TableCell>
									<TableCell
										className={`text-right ${efficiency?.class || ""}`}
									>
										{efficiency?.value || "-"}
									</TableCell>
								</TableRow>
							);
						})
					) : (
						<TableRow>
							<TableCell colSpan={6} className="text-center py-4 text-gray-500">
								No tasks available
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
