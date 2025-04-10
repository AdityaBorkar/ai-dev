"use client";

import { AsyncConfigAtom } from "@/algorithm/store";
import { useAtomValue } from "jotai";

export default function DashboardPage() {
	// const config = useAtomValue(AsyncConfigAtom);
	// console.log(config);
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
			{/* TODO: Add dashboard widgets */}
			<p>Dashboard content goes here...</p>
		</div>
	);
}
