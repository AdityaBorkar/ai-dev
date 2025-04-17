"use client";

import { Card } from "@/components/ui/card";

interface OverviewCardProps {
	title: string;
	value: string;
	description: string;
	icon: "tasks" | "tokens" | "calendar" | "roadblocks";
	status?: "positive" | "negative" | "neutral";
}

export function OverviewCard({
	title,
	value,
	description,
	icon,
	status = "neutral",
}: OverviewCardProps) {
	const getStatusClass = () => {
		switch (status) {
			case "positive":
				return "text-green-600";
			case "negative":
				return "text-red-600";
			default:
				return "text-gray-600";
		}
	};

	const renderIcon = () => {
		switch (icon) {
			case "tasks":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M9 11l3 3L22 4"></path>
						<path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
					</svg>
				);
			case "tokens":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="12" y1="8" x2="12" y2="12"></line>
						<line x1="12" y1="16" x2="12.01" y2="16"></line>
					</svg>
				);
			case "calendar":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
						<line x1="16" y1="2" x2="16" y2="6"></line>
						<line x1="8" y1="2" x2="8" y2="6"></line>
						<line x1="3" y1="10" x2="21" y2="10"></line>
					</svg>
				);
			case "roadblocks":
				return (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="10"></circle>
						<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<Card className="p-4">
			<div className="flex items-start justify-between">
				<div>
					<h4 className="text-sm font-medium text-gray-500">{title}</h4>
					<div className="mt-1 flex items-baseline">
						<p className="text-2xl font-semibold">{value}</p>
					</div>
					<p className={`text-sm ${getStatusClass()}`}>{description}</p>
				</div>
				<div className="text-gray-400">{renderIcon()}</div>
			</div>
		</Card>
	);
}
