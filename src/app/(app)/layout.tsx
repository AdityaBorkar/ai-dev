"use client";

import {
	PiChartLine,
	PiFileDoc,
	PiFolder,
	PiLayout,
	PiListChecks,
	PiRepeatOnce,
	PiCode,
} from "react-icons/pi";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

import useConfig from "@/hooks/useConfig";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
	{
		label: "Dashboard",
		href: "dashboard",
		icon: PiLayout,
	},
	{
		label: "PRD",
		href: "prd",
		icon: PiFileDoc,
	},
	{
		label: "Tasks",
		href: "tasks",
		icon: PiListChecks,
	},
	{
		label: "Cycles",
		href: "cycles",
		icon: PiRepeatOnce,
	},
	{
		label: "Repository",
		href: "repository",
		icon: PiFolder,
	},
	{
		label: "Stats",
		href: "stats",
		icon: PiChartLine,
	},
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const config = useConfig();
	if (!config) redirect("/onboarding");

	const url = usePathname();
	const segment = url.split("/")[1];

	return (
		<div className="grid grid-cols-[16rem_auto] h-screen">
			<aside className="border-r bg-card py-2 px-4">
				<div className="flex items-center mb-6 gap-2 py-1.5 px-4 font-mono text-foreground font-semibold bg-zinc-200 rounded-lg">
					<PiCode className="size-5" />
					{config.workspace.name}
				</div>

				<nav className="">
					{NAV_ITEMS.map((item) => {
						return (
							<Button
								key={item.href}
								variant={segment === item.href ? "default" : "ghost"}
								className="w-full justify-start !px-4 !py-5"
								asChild
							>
								<Link href={item.href}>
									<item.icon className="size-5" />
									{item.label}
								</Link>
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="overflow-y-auto">{children}</main>
		</div>
	);
}

// Store notes, knowledge
// Planner, find bugs

// Code Mode
// Debug Mode
// Architect Mode
