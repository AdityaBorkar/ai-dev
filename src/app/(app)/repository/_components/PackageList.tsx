import { useState, useMemo } from "react";
import {
	MoreHorizontal,
	ExternalLink,
	Search,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getExpandedRowModel,
	getGroupedRowModel,
	useReactTable,
	flexRender,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Package, PackageCategory } from "@/types/tech-stack";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Badge color mapping
const getBadgeStyles = (color: Label["color"]) => {
	const colorMap: Record<Label["color"], string> = {
		red: "bg-red-100 text-red-800 border-red-200",
		blue: "bg-blue-100 text-blue-800 border-blue-200",
		green: "bg-green-100 text-green-800 border-green-200",
		yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
		purple: "bg-purple-100 text-purple-800 border-purple-200",
		pink: "bg-pink-100 text-pink-800 border-pink-200",
		indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
		cyan: "bg-cyan-100 text-cyan-800 border-cyan-200",
		amber: "bg-amber-100 text-amber-800 border-amber-200",
		orange: "bg-orange-100 text-orange-800 border-orange-200",
		violet: "bg-violet-100 text-violet-800 border-violet-200",
		emerald: "bg-emerald-100 text-emerald-800 border-emerald-200",
	};

	return colorMap[color];
};

const columns: ColumnDef<Package>[] = [
	{
		accessorKey: "name",
		header: "Name",
		cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
	},
	{
		accessorKey: "version",
		header: "Version",
	},
	{
		accessorKey: "labels",
		header: "Labels",
		cell: ({ row }) => (
			<div className="flex flex-wrap gap-1">
				{row.original.labels.map((label) => (
					<Badge
						key={`${row.original.name}-${label.name}`}
						variant="outline"
						className={getBadgeStyles(label.color)}
					>
						{label.name}
					</Badge>
				))}
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: "docLink",
		header: "Documentation",
		cell: ({ row }) => (
			<>
				{row.original.docLink && (
					<a
						href={row.original.docLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center text-blue-600 hover:underline"
					>
						Docs <ExternalLink className="ml-1 h-3 w-3" />
					</a>
				)}
			</>
		),
		enableSorting: false,
	},
	{
		accessorKey: "lastUpdated",
		header: "Last Updated",
		cell: ({ row }) =>
			formatDistanceToNow(row.original.lastUpdated, { addSuffix: true }),
		sortingFn: "datetime",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		id: "actions",
		cell: () => (
			<div className="text-right">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600">
							Disable
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		),
	},
];

export default function PackageList({ project }: { project: any }) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [grouping, setGrouping] = useState<string[]>(["category"]);

	// Setup table data
	const table = useReactTable({
		data: project.packages,
		columns,
		state: {
			sorting,
			columnFilters,
			globalFilter,
			columnVisibility,
			grouping,
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getExpandedRowModel: getExpandedRowModel(),
		getGroupedRowModel: getGroupedRowModel(),
		enableGrouping: true,
	});

	const selectedApp = project;

	// Get available categories for grouping/filtering
	const categories = useMemo(() => {
		const categories = new Set<PackageCategory>();
		selectedApp.packages.forEach((pkg) => categories.add(pkg.category));
		return Array.from(categories);
	}, [selectedApp]);

	return (
		<div>
			<div>
				{/* Table Controls */}
				<div className="flex flex-col md:flex-row gap-4 py-4">
					<div className="flex flex-1 items-center space-x-2">
						<Search className="h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Search packages..."
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="h-8 w-full md:w-[250px]"
						/>
					</div>
					<div className="flex flex-wrap gap-2">
						<div>
							<Select
								value={grouping[0] || "none"}
								onValueChange={(value) => {
									if (value === "none") {
										setGrouping([]);
									} else {
										setGrouping([value]);
									}
								}}
							>
								<SelectTrigger className="h-8 w-[150px]">
									<SelectValue placeholder="Group by" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="none">No Grouping</SelectItem>
									<SelectItem value="category">Category</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Select
								value={
									(columnFilters.find((f) => f.id === "category")
										?.value as string) || "all"
								}
								onValueChange={(value) => {
									if (value === "all") {
										setColumnFilters(
											columnFilters.filter((f) => f.id !== "category"),
										);
									} else {
										setColumnFilters([
											...columnFilters.filter((f) => f.id !== "category"),
											{
												id: "category",
												value: value,
											},
										]);
									}
								}}
							>
								<SelectTrigger className="h-8 w-[150px]">
									<SelectValue placeholder="Filter by category" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="all">All Categories</SelectItem>
									{categories.map((category) => (
										<SelectItem key={category} value={category}>
											{category}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="rounded-md border">
					<table className="w-full">
						<thead>
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="border-b bg-muted/50">
									{headerGroup.headers.map((header) => (
										<th
											key={header.id}
											className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
											style={{ width: header.getSize() }}
										>
											{header.isPlaceholder ? null : (
												<div
													className={
														header.column.getCanSort()
															? "flex items-center space-x-1 cursor-pointer select-none"
															: ""
													}
													onClick={header.column.getToggleSortingHandler()}
													onKeyDown={(e) => {
														if (e.key === "Enter" || e.key === " ") {
															e.preventDefault();
															header.column.toggleSorting();
														}
													}}
													tabIndex={header.column.getCanSort() ? 0 : undefined}
													role={
														header.column.getCanSort() ? "button" : undefined
													}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
													{{
														asc: <ChevronDown className="h-3 w-3" />,
														desc: (
															<ChevronDown className="h-3 w-3 rotate-180" />
														),
													}[header.column.getIsSorted() as string] ?? null}
												</div>
											)}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.length > 0 ? (
								table.getRowModel().rows.map((row) => {
									return (
										<tr
											key={row.id}
											className={`border-b ${
												row.getIsGrouped() ? "bg-muted/50 font-medium" : ""
											}`}
											data-state={row.getIsSelected() ? "selected" : undefined}
										>
											{row.getVisibleCells().map((cell) => {
												return (
													<td
														key={cell.id}
														className="px-4 py-3 text-sm"
														style={{
															paddingLeft:
																cell.getIsGrouped() || cell.row.getIsGrouped()
																	? `${row.depth * 16 + 16}px`
																	: undefined,
														}}
													>
														{cell.getIsGrouped() ? (
															<div className="flex items-center gap-1">
																<Button
																	variant="ghost"
																	size="icon"
																	onClick={row.getToggleExpandedHandler()}
																>
																	{row.getIsExpanded() ? (
																		<ChevronDown className="h-4 w-4" />
																	) : (
																		<ChevronRight className="h-4 w-4" />
																	)}
																</Button>
																{flexRender(
																	cell.column.columnDef.cell,
																	cell.getContext(),
																)}{" "}
																({row.subRows.length})
															</div>
														) : cell.getIsAggregated() ? (
															flexRender(
																cell.column.columnDef.aggregatedCell ??
																	cell.column.columnDef.cell,
																cell.getContext(),
															)
														) : cell.getIsPlaceholder() ? null : (
															flexRender(
																cell.column.columnDef.cell,
																cell.getContext(),
															)
														)}
													</td>
												);
											})}
										</tr>
									);
								})
							) : (
								<tr>
									<td
										colSpan={columns.length}
										className="py-6 text-center text-muted-foreground"
									>
										No packages found
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
