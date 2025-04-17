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
import { ArrowDown, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
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
				cell: (info) => <span className="font-medium">{info.getValue()}</span>,
				size: 80,
			}),
			columnHelper.accessor("title", {
				header: "Title",
				cell: (info) => <span>{info.getValue()}</span>,
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
					<span className="text-muted-foreground">{info.getValue()}</span>
				),
				size: 150,
			}),
			columnHelper.accessor("due", {
				header: "Due Date",
				cell: (info) => (
					<span className="text-muted-foreground">{info.getValue()}</span>
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
				<p className="text-muted-foreground mb-2">No tasks found</p>
				<p className="text-sm text-muted-foreground/80">
					Try adjusting your filters or search criteria
				</p>
			</div>
		);
	}

	return (
		<div className="flex-grow overflow-auto">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id} style={{ width: header.getSize() }}>
									<Button
										variant="ghost"
										className="h-8 px-0 text-muted-foreground font-medium whitespace-nowrap"
										onClick={header.column.getToggleSortingHandler()}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() && (
											<span className="ml-1">
												{header.column.getIsSorted() === "asc" ? (
													<ArrowUp className="h-4 w-4" />
												) : (
													<ArrowDown className="h-4 w-4" />
												)}
											</span>
										)}
									</Button>
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							className="cursor-pointer hover:bg-muted/50"
							onClick={() => handleRowClick(row.original.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter" || e.key === " ") {
									handleRowClick(row.original.id);
								}
							}}
							tabIndex={0}
							data-state={row.getIsSelected() ? "selected" : undefined}
							aria-label={`View task ${row.original.id}`}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
};
