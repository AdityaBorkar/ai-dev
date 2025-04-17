"use client";

import type { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

import { KanbanBoard } from "@/components/tasks/KanbanBoard";
import { type TabType, TasksHeader } from "@/components/tasks/TasksHeader";
import { TasksTable } from "@/components/tasks/TasksTable";
import { ToolbarControls } from "@/components/tasks/ToolbarControls";
import type { ViewMode } from "@/components/tasks/ViewToggle";

// Data
import { MOCK_TASKS } from "@/components/tasks/mock-data";

export function TasksClient() {
	// Tab state
	const [activeTab, setActiveTab] = useState<TabType>("all");

	// View mode state
	const [viewMode, setViewMode] = useState<ViewMode>("board");

	// Search state
	const [searchQuery, setSearchQuery] = useState("");

	// Table state
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	// Filter panel state
	const [showFilterPanel, setShowFilterPanel] = useState(false);

	// Create new task handler (placeholder)
	const handleCreateTask = () => {
		alert("Create new task feature not implemented yet");
	};

	// Filter tasks based on active tab and search query
	const filteredTasks = MOCK_TASKS.filter((task) => {
		// Tab filtering
		if (activeTab === "active") {
			return task.status === "Todo" || task.status === "In Progress";
		}
		if (activeTab === "backlog") {
			return task.status === "Todo";
		}
		return true; // 'all' tab
	}).filter((task) => {
		// Search filtering
		if (!searchQuery) return true;
		const query = searchQuery.toLowerCase();
		return (
			task.title.toLowerCase().includes(query) ||
			task.id.toLowerCase().includes(query) ||
			task.assignee.toLowerCase().includes(query)
		);
	});

	return (
		<div className="flex flex-col h-full">
			{/* Header with tabs */}
			<TasksHeader
				activeTab={activeTab}
				onTabChange={setActiveTab}
				onCreateTask={handleCreateTask}
			/>

			{/* Toolbar with display options */}
			<ToolbarControls
				viewMode={viewMode}
				onViewModeChange={setViewMode}
				onShowFilterPanel={() => setShowFilterPanel(!showFilterPanel)}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
			/>

			{/* Main content area */}
			<div className="flex-grow overflow-hidden">
				{viewMode === "list" ? (
					<TasksTable
						tasks={filteredTasks}
						sorting={sorting}
						setSorting={setSorting}
						columnFilters={columnFilters}
						searchQuery={searchQuery}
					/>
				) : (
					<KanbanBoard tasks={filteredTasks} />
				)}
			</div>
		</div>
	);
}
