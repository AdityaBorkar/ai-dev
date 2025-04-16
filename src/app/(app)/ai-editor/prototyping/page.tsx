"use client";

import { PiPencilLine } from "react-icons/pi";

export default function PrototypingPage() {
	return (
		<div className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<PiPencilLine className="size-5" />
				<h1 className="text-2xl font-bold">Prototyping</h1>
			</div>
			<div className="bg-white rounded-lg shadow p-6">
				<p>Create and manage your prototypes here.</p>
			</div>
		</div>
	);
}
