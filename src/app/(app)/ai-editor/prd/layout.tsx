export default function PRDLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-row h-full">
			<div className="flex flex-row gap-4">
				<div>SELECT VERSION</div>

				<div>Goals</div>
				<div>Features</div>
				<div>Constraints</div>
				<div>User Stories</div>
			</div>

			<div className="flex-1">{children}</div>
		</div>
	);
}
