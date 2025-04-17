"use client";

import {
	PiChartLine,
	PiFileDoc,
	PiFolder,
	PiLayout,
	PiListChecks,
	PiNotebook,
	PiRepeatOnce,
	PiCode,
} from "react-icons/pi";
import { redirect, usePathname } from "next/navigation";
import Link from "next/link";

import useConfig from "@/hooks/useConfig";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
	{
		label: "Home",
		items: [
			{
				label: "Dashboard",
				href: "/dashboard",
				icon: PiLayout,
			},
			{
				label: "Stats",
				href: "/stats-sde",
				icon: PiChartLine,
			},
		],
	},
	{
		label: "Product Management",
		items: [
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
		],
	},
	{
		label: "Software Development",
		items: [
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
		],
	},
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const config = useConfig();
	if (!config) redirect("/onboarding");

	const currentPath = usePathname();
	return (
		<div className="flex h-screen bg-background">
			<aside className="w-64 border-r bg-card py-2 px-4 flex flex-col">
				<div className="flex items-center mb-6 gap-2 py-1.5 px-4 font-mono text-muted-foreground font-semibold bg-neutral-200 rounded-lg">
					<PiCode className="size-5" />
					{config.workspace.name}
				</div>

				<nav className="flex-1 space-y-1">
					{NAV_ITEMS.map((item) => {
						return (
							<div key={item.label} className="not-first:mt-6">
								<div className="text-sm px-4 mb-2 font-semibold text-muted-foreground">
									{item.label}
								</div>
								{item.items.map((item) => (
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
							</div>
						);
					})}
				</nav>
			</aside>
			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
