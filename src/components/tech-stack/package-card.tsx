"use client";

import { cn } from "@/lib/utils";
import type { Package } from "@/types/tech-stack";
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
import Image from "next/image";

interface PackageCardProps {
	pkg: Package;
	onEditDocs: (id: string, currentUrl: string) => void;
}

export function PackageCard({ pkg, onEditDocs }: PackageCardProps) {
	const {
		name,
		version,
		docsUrl,
		lastScrapedDate,
		isUpdateAvailable,
		description,
		logoUrl,
		isUnused,
		hasSecurityAlert,
		isLocal,
		docSource,
	} = pkg;

	return (
		<div
			className={cn(
				"border rounded-lg p-5 relative transition-all w-full hover:shadow-sm hover:border-primary/30 bg-white dark:bg-gray-900",
				isLocal
					? "border-indigo-200 dark:border-indigo-800"
					: "border-gray-200 dark:border-gray-800",
			)}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-3">
					{logoUrl && (
						<div className="h-10 w-10 relative overflow-hidden rounded-md flex-shrink-0 bg-gray-50 dark:bg-gray-800 p-1">
							<img
								src={logoUrl}
								alt={name}
								width={40}
								height={40}
								className="object-contain"
							/>
						</div>
					)}
					<div>
						<div className="flex items-center gap-2">
							<h3 className="font-medium text-lg">{name}</h3>
							{isLocal && (
								<span className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
									Local
								</span>
							)}
						</div>
						{description && (
							<p className="text-sm text-muted-foreground mt-1">
								{description}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center gap-2">
					<a
						href={docsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground hover:text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
						title={`View ${isLocal ? "local documentation" : "external documentation"}`}
					>
						{isLocal ? (
							docSource === "path" ? (
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
						onClick={(e) => {
							e.stopPropagation();
							onEditDocs(pkg.id, docsUrl);
						}}
						className="text-muted-foreground hover:text-primary p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
						title="Edit documentation link"
					>
						<Edit className="h-4 w-4" />
					</button>
				</div>
			</div>

			<div className="flex flex-col gap-3 mt-5">
				<div className="flex flex-wrap items-center gap-2">
					<span className="px-2 py-1 bg-secondary rounded-full text-xs">
						v{version}
					</span>
					{isLocal && docSource && (
						<span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
							{docSource === "path" ? (
								<FolderDot className="h-3 w-3" />
							) : (
								<Book className="h-3 w-3" />
							)}
							{docSource === "path" ? "Path" : "JSDoc"}
						</span>
					)}
					{isUpdateAvailable && (
						<span className="flex items-center gap-1 text-amber-500 px-2 py-0.5 rounded-full bg-amber-500/10 text-xs">
							<XCircle className="h-3 w-3" />
							Update
						</span>
					)}
					{isUnused && (
						<span className="flex items-center gap-1 text-slate-500 px-2 py-0.5 rounded-full bg-slate-500/10 text-xs">
							<Shield className="h-3 w-3" />
							Unused
						</span>
					)}
					{hasSecurityAlert && (
						<span className="flex items-center gap-1 text-red-500 px-2 py-0.5 rounded-full bg-red-500/10 text-xs">
							<ShieldAlert className="h-3 w-3" />
							Security
						</span>
					)}
				</div>

				<div className="text-xs text-muted-foreground flex justify-between items-center pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
					<span>Last updated: {lastScrapedDate}</span>
					{isLocal && (
						<span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">
							{docsUrl}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
