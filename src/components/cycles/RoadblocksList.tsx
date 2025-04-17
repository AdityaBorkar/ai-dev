"use client";

import type { CycleRoadblock } from "./types";
import { formatDate } from "./utils";

interface RoadblocksListProps {
	roadblocks: CycleRoadblock[];
}

export function RoadblocksList({ roadblocks }: RoadblocksListProps) {
	if (roadblocks.length === 0) {
		return (
			<div className="text-center py-8 text-gray-500">No roadblocks found</div>
		);
	}

	return (
		<div className="space-y-4">
			{roadblocks.map((roadblock) => (
				<div
					key={roadblock.id}
					className={`p-4 rounded-md border ${
						roadblock.status === "Active"
							? "border-red-200 bg-red-50"
							: "border-gray-200"
					}`}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div
								className={`h-2 w-2 rounded-full mr-2 ${
									roadblock.status === "Active" ? "bg-red-500" : "bg-green-500"
								}`}
							/>
							<span
								className={`text-xs px-2 py-1 rounded-full ${
									roadblock.status === "Active"
										? "bg-red-100 text-red-800"
										: "bg-green-100 text-green-800"
								}`}
							>
								{roadblock.status}
							</span>
						</div>
						<div className="text-xs text-gray-500">
							Created: {formatDate(roadblock.createdAt)}
							{roadblock.resolvedAt && (
								<span className="ml-3">
									Resolved: {formatDate(roadblock.resolvedAt)}
								</span>
							)}
						</div>
					</div>

					<p className="mt-2 text-gray-700">{roadblock.description}</p>
				</div>
			))}
		</div>
	);
}
