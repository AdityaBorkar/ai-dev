"use client";

import { PiArticle } from "react-icons/pi";

export default function UserRulesPage() {
	return (
		<div className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<PiArticle className="size-5" />
				<h1 className="text-2xl font-bold">User Rules</h1>
			</div>
			<div className="bg-white rounded-lg shadow p-6">
				<p>Manage your user rules here.</p>
			</div>
		</div>
	);
}
