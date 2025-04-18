"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";

import { ProjectsAtom, WorkspaceAtom } from "../store";

export default function RepositoryLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const workspace = useAtomValue(WorkspaceAtom);
	const projects = useAtomValue(ProjectsAtom);

	return (
		<div className="px-16 py-8 text-sm cursor-default">
			<div className="grid grid-cols-[16rem_auto] border border-border rounded-md">
				<aside className="flex flex-col gap-2 py-4 px-4 border-r border-border overflow-y-auto">
					{workspace.monorepo && (
						<div className="py-1 px-2 rounded-md border border-border text-amber-800 bg-amber-100">
							Monorepo managed by {workspace.monorepo}
						</div>
					)}
					{workspace.vcs && (
						<div className="py-1 px-2 rounded-md border border-border text-amber-800 bg-amber-100">
							VCS using {workspace.vcs}
						</div>
					)}
					{workspace.repo && (
						<div className="py-1 px-2 rounded-md border border-border text-amber-800 bg-amber-100">
							Repository managed on {workspace.repo}
						</div>
					)}
					{projects.map((project) => (
						<Link
							key={project.name}
							href={
								project.name === "$Root"
									? "/repository"
									: `/repository/${project.name}`
							}
							className="py-1 px-2 rounded-md border border-border group"
						>
							<div className="flex flex-row justify-between gap-8">
								<div className="font-medium">{project.name}</div>
								<div className="not-group-hover:invisible text-xs">
									{project.path}
								</div>
							</div>
							<div className="text-xs">{project.description}</div>
						</Link>
					))}
				</aside>

				<main className="px-16 py-4">{children}</main>
			</div>
		</div>
	);
}
