"use client";

import { PiBookOpen } from "react-icons/pi";

export default function DocsSourcesPage() {
	return (
		<div className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<PiBookOpen className="size-5" />
				<h1 className="text-2xl font-bold">Docs Sources</h1>
			</div>
			<div className="bg-white rounded-lg shadow p-6">
				<p>Manage your documentation sources here.</p>
			</div>
		</div>
	);
}
