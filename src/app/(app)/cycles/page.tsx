"use client";

import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { CyclesClient } from "./cycles-client";

export default function CyclesPage() {
	return (
		<div className="p-6 space-y-4">
			<h1 className="sr-only">Cycles</h1>

			<Card className="h-[calc(100vh-100px)]">
				<Suspense
					fallback={<div className="p-8 text-center">Loading cycles...</div>}
				>
					<CyclesClient />
				</Suspense>
			</Card>
		</div>
	);
}
