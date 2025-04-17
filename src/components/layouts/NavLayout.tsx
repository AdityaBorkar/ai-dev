"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
	label: string;
	href: string;
	icon: React.ElementType;
};

export default function NavLayout({
	children,
	navItems,
	prefix = "",
	header,
}: {
	children: React.ReactNode;
	navItems: NavItem[];
	prefix?: string;
	header?: React.ReactNode;
}) {
	const currentPath = usePathname();
	return (
		<div className="flex h-full">
			<aside className="w-64 border-r bg-card p-4 flex flex-col">
				<nav className="flex-1 space-y-1">
					<div className="mb-6">{header}</div>
					{navItems.map((item) => {
						const fullHref = `${prefix}${item.href}`;
						return (
							<Button
								key={item.href}
								variant={currentPath === fullHref ? "default" : "ghost"}
								className="w-full justify-start !px-4 !py-5"
								asChild
							>
								<Link href={fullHref}>
									<item.icon className="size-5" />
									{item.label}
								</Link>
							</Button>
						);
					})}
				</nav>
			</aside>
			<main className="flex-1 overflow-y-auto">{children}</main>
		</div>
	);
}
