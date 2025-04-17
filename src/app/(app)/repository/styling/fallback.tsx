export default function RepositoryStylingFallback() {
	return (
		<div className="space-y-6 p-6">
			<div className="h-8 w-1/3 bg-gray-200 animate-pulse rounded-md" />

			<div className="space-y-4">
				<div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded-md" />
				<div className="h-64 w-full bg-gray-100 animate-pulse rounded-md" />
			</div>

			<div className="space-y-4">
				<div className="flex justify-between">
					<div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded-md" />
					<div className="h-10 w-1/3 bg-gray-200 animate-pulse rounded-md" />
				</div>
				<div className="h-64 w-full bg-gray-100 animate-pulse rounded-md" />
				<div className="h-64 w-full bg-gray-100 animate-pulse rounded-md" />
			</div>
		</div>
	);
}
