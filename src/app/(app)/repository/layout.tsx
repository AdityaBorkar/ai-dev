"use client";

import NavLayout from "@/components/layouts/NavLayout";
import {
	PiBookOpen,
	PiDatabase,
	PiGear,
	PiGitMerge,
	PiPencilLine,
	PiTreeStructure,
} from "react-icons/pi";

const NAV_ITEMS = [
	{
		label: "Tech Stack",
		href: "/tech-stack",
		icon: PiDatabase,
	},
	{
		label: "Styling",
		href: "/styling",
		icon: PiPencilLine,
	},
	{
		label: "Structure",
		href: "/structure",
		icon: PiTreeStructure,
	},
	{
		label: "Git",
		href: "/git",
		icon: PiGitMerge,
	},
];

export default function RepositoryLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<NavLayout
			prefix="/repository"
			navItems={NAV_ITEMS}
			header={
				<div className="flex items-center mb-6 gap-2 py-2 px-6 bg-pink-200 rounded-lg">
					<PiBookOpen className="size-5" />
					Repository
				</div>
			}
		>
			<div>{children}</div>
		</NavLayout>
	);
}
