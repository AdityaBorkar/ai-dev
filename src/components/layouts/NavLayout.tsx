import Link from "next/link";

type NavItem = {
	label: string;
	href: string;
	icon: React.ElementType;
};

export default function NavLayout({
	children,
	navItems,
}: {
	children: React.ReactNode;
	navItems: NavItem[];
}) {
	return (
		<>
			<nav>
				{navItems.map((item) => (
					<Link href={item.href} key={item.href}>
						<item.icon />
						{item.label}
					</Link>
				))}
			</nav>
			{children}
		</>
	);
}
