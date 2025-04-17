"use client";

import { type Package, PackageCategory } from "@/types/tech-stack";
import {
	Book,
	Edit,
	ExternalLink,
	FileSymlink,
	FolderDot,
	Shield,
	ShieldAlert,
	XCircle,
} from "lucide-react";

interface PackageTableViewProps {
	packages: Package[];
	onEditDocs: (id: string, currentUrl: string) => void;
	categoryLabel: string;
}

export function PackageTableView({
	packages,
	onEditDocs,
	categoryLabel,
}: PackageTableViewProps) {
	return (
		<div className="overflow-x-auto my-4">
			<h3 className="text-lg font-medium mb-3">{categoryLabel}</h3>
			<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
				<table className="w-full border-collapse">
					<thead className="bg-gray-50 dark:bg-gray-900/80">
						<tr>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Package
							</th>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Version
							</th>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Last Updated
							</th>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Status
							</th>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Documentation
							</th>
							<th className="p-3 text-left font-medium text-sm border-b border-gray-200 dark:border-gray-800">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{packages.map((pkg) => (
							<tr
								key={pkg.id}
								className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
							>
								<td className="p-3">
									<div className="flex items-center gap-2">
										{pkg.logoUrl && (
											<div className="h-6 w-6 relative overflow-hidden rounded-sm bg-gray-50 dark:bg-gray-800 p-0.5">
												<img
													src={pkg.logoUrl}
													alt={pkg.name}
													width={24}
													height={24}
													className="object-contain"
												/>
											</div>
										)}
										<div className="flex flex-col">
											<div className="flex items-center gap-2">
												<span className="font-medium">{pkg.name}</span>
												{pkg.isLocal && (
													<span className="px-1.5 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 leading-none">
														Local
													</span>
												)}
											</div>
											{pkg.description && (
												<span className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">
													{pkg.description}
												</span>
											)}
										</div>
									</div>
								</td>
								<td className="p-3">
									<span className="px-2 py-1 text-xs bg-secondary rounded-full">
										{pkg.version}
									</span>
								</td>
								<td className="p-3 text-sm text-muted-foreground">
									{pkg.lastScrapedDate}
								</td>
								<td className="p-3">
									<div className="flex flex-wrap gap-1">
										{pkg.isUpdateAvailable && (
											<span className="flex items-center text-xs gap-1 text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10">
												<XCircle className="h-3 w-3" />
												Update
											</span>
										)}
										{pkg.isUnused && (
											<span className="flex items-center text-xs gap-1 text-slate-500 px-2 py-0.5 rounded-full bg-slate-500/10">
												<Shield className="h-3 w-3" />
												Unused
											</span>
										)}
										{pkg.hasSecurityAlert && (
											<span className="flex items-center text-xs gap-1 text-red-500 px-2 py-0.5 rounded-full bg-red-500/10">
												<ShieldAlert className="h-3 w-3" />
												Security
											</span>
										)}
									</div>
								</td>
								<td className="p-3">
									{pkg.isLocal ? (
										<div className="flex items-center gap-1 text-xs">
											{pkg.docSource === "path" ? (
												<>
													<FolderDot className="h-3 w-3 text-blue-500" />
													<span className="text-muted-foreground">
														Path: {pkg.docsUrl}
													</span>
												</>
											) : (
												<>
													<Book className="h-3 w-3 text-blue-500" />
													<span className="text-muted-foreground">
														JSDoc: {pkg.docsUrl}
													</span>
												</>
											)}
										</div>
									) : (
										<div className="flex items-center gap-1 text-xs">
											<ExternalLink className="h-3 w-3 text-blue-500" />
											<span className="text-muted-foreground truncate max-w-xs">
												{pkg.docsUrl}
											</span>
										</div>
									)}
								</td>
								<td className="p-3">
									<div className="flex items-center gap-2">
										<a
											href={pkg.docsUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-muted-foreground hover:text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
											title={`View ${pkg.isLocal ? "local documentation" : "external documentation"}`}
										>
											{pkg.isLocal ? (
												pkg.docSource === "path" ? (
													<FileSymlink className="h-4 w-4" />
												) : (
													<Book className="h-4 w-4" />
												)
											) : (
												<ExternalLink className="h-4 w-4" />
											)}
										</a>
										<button
											type="button"
											onClick={() => onEditDocs(pkg.id, pkg.docsUrl)}
											className="text-muted-foreground hover:text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
											title="Edit documentation link"
										>
											<Edit className="h-4 w-4" />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
