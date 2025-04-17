import {
	type ColumnFiltersState,
	type SortingState,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import type React from "react";
import { useMemo } from "react";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { TaskStatusBadge } from "./TaskStatusBadge";
import type { Task } from "./types";

interface TasksTableProps {
	tasks: Task[];
	sorting: SortingState;
	setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
	columnFilters: ColumnFiltersState;
	searchQuery: string;
}

export const TasksTable: React.FC<TasksTableProps> = ({
	tasks,
	sorting,
	setSorting,
	columnFilters,
	searchQuery,
}) => {
	const router = useRouter();
	const columnHelper = createColumnHelper<Task>();

	// Define global text filter function for search
	const globalFilterFn = useMemo(() => {
		return (row: Task) => {
			if (!searchQuery) return true;
			const searchLower = searchQuery.toLowerCase();
			return (
				row.title.toLowerCase().includes(searchLower) ||
				row.id.toLowerCase().includes(searchLower) ||
				row.assignee.toLowerCase().includes(searchLower)
			);
		};
	}, [searchQuery]);

	// Filter tasks using global filter function
	const filteredTasks = useMemo(() => {
		return tasks.filter(globalFilterFn);
	}, [tasks, globalFilterFn]);

	// Define columns
	const columns = useMemo(
		() => [
			columnHelper.accessor("id", {
				header: "ID",
				cell: (info) => (
					<span className="text-sm font-medium text-gray-500">
						{info.getValue()}
					</span>
				),
				size: 80,
			}),
			columnHelper.accessor("title", {
				header: "Title",
				cell: (info) => (
					<span className="text-sm text-gray-900 dark:text-gray-100">
						{info.getValue()}
					</span>
				),
			}),
			columnHelper.accessor("status", {
				header: "Status",
				cell: (info) => <TaskStatusBadge status={info.getValue()} />,
				size: 120,
			}),
			columnHelper.accessor("priority", {
				header: "Priority",
				cell: (info) => <TaskPriorityBadge priority={info.getValue()} />,
				size: 100,
			}),
			columnHelper.accessor("assignee", {
				header: "Assignee",
				cell: (info) => (
					<span className="text-sm text-gray-500">{info.getValue()}</span>
				),
				size: 150,
			}),
			columnHelper.accessor("due", {
				header: "Due Date",
				cell: (info) => (
					<span className="text-sm text-gray-500">{info.getValue()}</span>
				),
				size: 120,
			}),
		],
		[columnHelper],
	);

	// Initialize the table
	const table = useReactTable({
		data: filteredTasks,
		columns,
		state: {
			sorting,
			columnFilters,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		enableSorting: true,
		enableFilters: true,
		enableColumnFilters: true,
	});

	// Handle row click
	const handleRowClick = (id: string) => {
		router.push(`/tasks/${id}`);
	};

	// Show empty state if no tasks after filtering
	if (filteredTasks.length === 0) {
		return (
			<div className="flex-grow flex flex-col items-center justify-center py-16">
				<p className="text-gray-500 mb-2">No tasks found</p>
				<p className="text-sm text-gray-400">
					Try adjusting your filters or search criteria
				</p>
			</div>
		);
	}

	return (
		<div className="flex-grow overflow-auto">
			<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
				<thead className="bg-gray-50 dark:bg-gray-900">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									style={{ width: header.getSize() }}
									onClick={header.column.getToggleSortingHandler()}
								>
									<div className="flex items-center space-x-1 cursor-pointer">
										<span>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</span>
										<span>
											{{
												asc: " 🔼",
												desc: " 🔽",
											}[header.column.getIsSorted() as string] ?? null}
										</span>
									</div>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
					{table.getRowModel().rows.map((row) => (
						<tr
							key={row.id}
							className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
							onClick={() => handleRowClick(row.original.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleRowClick(row.original.id);
								}
							}}
							tabIndex={0}
							aria-label={`View task ${row.original.id}`}
						>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-6 py-3 whitespace-nowrap">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
