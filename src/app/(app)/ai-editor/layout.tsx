import NavLayout from "@/components/layouts/NavLayout";
import { BookOpen, BookText, Compass, Plug } from "lucide-react";

const NAV_PREFIX = "/ai-editor";
const NAV_ITEMS = [
	{
		label: "User Rules",
		href: "/user-rules",
		icon: BookText,
	},
	{
		label: "Project Rules",
		href: "/project-rules",
		icon: BookText,
	},
	{
		label: "Docs Sources",
		href: "/docs-sources",
		icon: BookOpen,
	},
	{
		label: "MCP Servers",
		href: "/mcp",
		icon: Plug,
	},
	{
		label: "Explore",
		href: "/explore",
		icon: Compass,
	},
];

export default function AIEditorLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<NavLayout navItems={NAV_ITEMS}>
			<div>{children}</div>
		</NavLayout>
	);
}
