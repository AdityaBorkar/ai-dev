"use client";

import { StyleConfigProvider } from "@/contexts/StyleConfigContext";
import { Suspense } from "react";
import RepositoryStylingFallback from "./fallback";

export default function StyleConfigLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<StyleConfigProvider>
			<div className="container mx-auto py-6">
				<Suspense fallback={<RepositoryStylingFallback />}>{children}</Suspense>
			</div>
		</StyleConfigProvider>
	);
}
