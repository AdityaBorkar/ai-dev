"use client";

import NavLayout from "@/components/layouts/NavLayout";
import { PiArticle, PiBookOpen, PiPencilLine, PiPlug } from "react-icons/pi";

const NAV_ITEMS = [
	{
		label: "MCP Servers",
		href: "/mcp",
		icon: PiPlug,
	},
	{
		label: "Prototyping",
		href: "/prototyping",
		icon: PiPencilLine,
	},
	{
		label: "Docs Sources",
		href: "/docs-sources",
		icon: PiBookOpen,
	},
	{
		label: "Project Rules",
		href: "/project-rules",
		icon: PiArticle,
	},
	{
		label: "User Rules",
		href: "/user-rules",
		icon: PiArticle,
	},
	// TODO: Make this external link to https://cursor.directory/
	// {
	// 	label: "Explore",
	// 	href: "/explore",
	// 	icon: PiCompass,
	// },
];

export default function AIEditorLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<NavLayout
			prefix="/ai-editor"
			navItems={NAV_ITEMS}
			header={
				<div className="flex items-center gap-2 py-2 px-6 bg-pink-200 rounded-lg">
					<PiBookOpen className="size-5" />
					Cursor
				</div>
			}
		>
			<div>{children}</div>
		</NavLayout>
	);
}
