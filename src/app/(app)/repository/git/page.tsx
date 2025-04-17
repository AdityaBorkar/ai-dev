"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TipTapEditor } from "@/components/ui/tiptap-editor";
import { useState } from "react";

const defaultContent = {
	commitStrategy: `<h1>Commit Strategy</h1>
<p>Define whether your team uses Conventional Commits or another strategy.</p>`,

	commitFormat: `<h1>Commit Message Format</h1>
<p>Define the structure and guidelines for commit messages.</p>`,

	whenToCommit: `<h1>When to Commit</h1>
<p>Guidelines on when and how often to make commits.</p>`,

	preCommitChecks: `<h1>Pre-Commit Checks</h1>
<p>Automated and manual checks to perform before committing code.</p>`,

	branchingStrategy: `<h1>Git Branching Strategy</h1>
<p>Guidelines for branch organization and management.</p>`,
};

export default function GitConfigPage() {
	const [activeTab, setActiveTab] = useState("commitStrategy");
	const [content, setContent] = useState(defaultContent);

	const handleContentChange = (section: string, newContent: string) => {
		setContent((prevContent) => ({
			...prevContent,
			[section]: newContent,
		}));
	};

	return (
		<div className="container py-6 max-w-6xl">
			<Card className="border-none shadow-sm">
				<CardHeader className="pb-4">
					<CardTitle className="text-2xl font-bold">
						Git Configuration
					</CardTitle>
					<CardDescription>
						Define your team's Git workflow and standards using the editor below
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						value={activeTab}
						onValueChange={setActiveTab}
						className="w-full"
					>
						<TabsList className="grid grid-cols-5 mb-4">
							<TabsTrigger value="commitStrategy">Commit Strategy</TabsTrigger>
							<TabsTrigger value="commitFormat">Message Format</TabsTrigger>
							<TabsTrigger value="whenToCommit">When to Commit</TabsTrigger>
							<TabsTrigger value="preCommitChecks">
								Pre-Commit Checks
							</TabsTrigger>
							<TabsTrigger value="branchingStrategy">
								Branching Strategy
							</TabsTrigger>
						</TabsList>

						<TabsContent value="commitStrategy" className="mt-0">
							<div className="mb-2 px-1 text-sm text-gray-500">
								Define whether your team uses Conventional Commits or another
								approach
							</div>
							<TipTapEditor
								content={content.commitStrategy}
								onChange={(newContent) =>
									handleContentChange("commitStrategy", newContent)
								}
								className="min-h-[60vh]"
							/>
						</TabsContent>

						<TabsContent value="commitFormat" className="mt-0">
							<div className="mb-2 px-1 text-sm text-gray-500">
								Define the structure and guidelines for commit messages
							</div>
							<TipTapEditor
								content={content.commitFormat}
								onChange={(newContent) =>
									handleContentChange("commitFormat", newContent)
								}
								className="min-h-[60vh]"
							/>
						</TabsContent>

						<TabsContent value="whenToCommit" className="mt-0">
							<div className="mb-2 px-1 text-sm text-gray-500">
								Guidelines on when and how often to make commits
							</div>
							<TipTapEditor
								content={content.whenToCommit}
								onChange={(newContent) =>
									handleContentChange("whenToCommit", newContent)
								}
								className="min-h-[60vh]"
							/>
						</TabsContent>

						<TabsContent value="preCommitChecks" className="mt-0">
							<div className="mb-2 px-1 text-sm text-gray-500">
								Automated and manual checks to perform before committing code
							</div>
							<TipTapEditor
								content={content.preCommitChecks}
								onChange={(newContent) =>
									handleContentChange("preCommitChecks", newContent)
								}
								className="min-h-[60vh]"
							/>
						</TabsContent>

						<TabsContent value="branchingStrategy" className="mt-0">
							<div className="mb-2 px-1 text-sm text-gray-500">
								Guidelines for branch organization and management
							</div>
							<TipTapEditor
								content={content.branchingStrategy}
								onChange={(newContent) =>
									handleContentChange("branchingStrategy", newContent)
								}
								className="min-h-[60vh]"
							/>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
