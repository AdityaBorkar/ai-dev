"use client";

import { PiPlug } from "react-icons/pi";

export default function MCPServersPage() {
	return (
		<div className="p-4">
			<div className="flex items-center gap-2 mb-4">
				<PiPlug className="size-5" />
				<h1 className="text-2xl font-bold">MCP Servers</h1>
			</div>
			<div className="bg-white rounded-lg shadow p-6">
				<p>Manage your MCP servers here.</p>
			</div>
		</div>
	);
}
