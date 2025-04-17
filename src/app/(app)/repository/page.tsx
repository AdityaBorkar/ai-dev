"use client";

import RepositoryStructure from "@/app/(app)/repository/structure/page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryState } from "nuqs";

const TABS = [
	{
		label: "File Structure",
		value: "file-structure",
	},
	{
		label: "Tech Stack",
		value: "tech-stack",
	},
	{
		label: "Repository Configs",
		value: "repository-configs",
	},
	{
		label: "Style Configs",
		value: "style-configs",
	},
	{
		label: "Git Workflow",
		value: "git-workflow",
	},
];

export default function RepositoryPage() {
	const [tab, setTab] = useQueryState("tab", {
		defaultValue: "file-structure",
	});

	return (
		<div>
			<Tabs
				className="border-b border-border py-1 px-4"
				onValueChange={setTab}
				value={tab}
			>
				<TabsList>
					{TABS.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{TABS.map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						{tab.value === "file-structure" && <RepositoryStructure />}
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}
