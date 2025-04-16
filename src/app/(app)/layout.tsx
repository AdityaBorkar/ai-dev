"use client";

import { Button } from "@/components/ui/button";
import useConfig from "@/hooks/useConfig";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import {
	PiBookOpen,
	PiChartLine,
	PiFileDoc,
	PiFolder,
	PiLayout,
	PiListChecks,
	PiNotebook,
	PiRepeatOnce,
} from "react-icons/pi";

const NAV_ITEMS = [
	{
		label: "Dashboard",
		href: "/dashboard",
		icon: PiLayout,
	},
	{
		label: "Cycles",
		href: "/cycles",
		icon: PiRepeatOnce,
	},
	{
		label: "Tasks",
		href: "/tasks",
		icon: PiListChecks,
	},
	{
		label: "PRD",
		href: "/prd",
		icon: PiFileDoc,
	},
	{
		label: "Repository",
		href: "/repository",
		icon: PiFolder,
	},
	{
		label: "AI Editor",
		href: "/ai-editor",
		icon: PiNotebook,
	},
	{
		label: "Stats",
		href: "/stats",
		icon: PiChartLine,
	},
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const config = useConfig();
	if (!config) redirect("/onboarding");

	const currentPath = usePathname();
	return (
		<div className="flex h-screen bg-background">
			<aside className="w-64 border-r bg-card p-4 flex flex-col">
				<div className="flex items-center mb-6 gap-2 py-2 px-6 bg-pink-200 rounded-lg">
					<PiBookOpen className="size-5" />
					Project Name
				</div>

				<nav className="flex-1 space-y-1">
					{NAV_ITEMS.map((item) => (
						<Button
							key={item.href}
							variant={currentPath === item.href ? "default" : "ghost"}
							className="w-full justify-start !px-4 !py-5"
							asChild
						>
							<Link href={item.href}>
								<item.icon className="size-5" />
								{item.label}
							</Link>
						</Button>
					))}
				</nav>
			</aside>
			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
