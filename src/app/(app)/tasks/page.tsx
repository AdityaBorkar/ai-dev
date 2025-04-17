"use client";

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { TasksClient } from "./tasks-client";
export default function TasksPage() {
	return (
		<div className="p-6 space-y-4">
			<h1 className="sr-only">Tasks</h1>

			<Card className="h-[calc(100vh-100px)]">
				<Suspense
					fallback={<div className="p-8 text-center">Loading tasks...</div>}
				>
					<TasksClient />
				</Suspense>
			</Card>
		</div>
	);
}
