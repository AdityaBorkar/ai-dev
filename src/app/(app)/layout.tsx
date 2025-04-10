"use client";

import { Button } from "@/components/ui/button";
import useConfig from "@/hooks/useConfig";
import {
	BookText,
	Boxes,
	LayoutDashboard,
	ListChecks,
	RefreshCcwDot,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
	},
	{
		label: "Repository",
		href: "/repository",
		icon: Boxes,
	},
	{
		label: "Cycles",
		href: "/cycles",
		icon: RefreshCcwDot,
	},
	{
		label: "Tasks",
		href: "/tasks",
		icon: ListChecks,
	},
	{
		label: "PRD",
		href: "/prd",
		icon: BookText,
	},
	{
		label: "AI Editor",
		href: "/ai-editor",
		icon: Settings,
	},
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const currentPath = usePathname();
	const config = useConfig();

	return (
		<div className="flex h-screen bg-background">
			<aside className="w-64 border-r bg-card p-4 flex flex-col">
				<div className="mb-6">
					<h1 className="text-xl font-semibold text-card-foreground mb-1">
						{config.name}
					</h1>
					<p className="text-sm text-muted-foreground">{config.description}</p>
				</div>

				<nav className="flex-1 space-y-1">
					{NAV_ITEMS.map((item) => (
						<Button
							key={item.href}
							variant={currentPath === item.href ? "default" : "ghost"}
							className="w-full justify-start"
							asChild
						>
							<Link href={item.href}>
								<item.icon className="mr-2 h-4 w-4" />
								{item.label}
							</Link>
						</Button>
					))}
				</nav>
			</aside>
			<main className="flex-1 p-6 overflow-y-auto">{children}</main>
		</div>
	);
}
