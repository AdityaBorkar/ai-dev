type TaskDetailPageProps = {
	params: { id: string };
};

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
	return (
		<div>
			<h1 className="text-2xl font-semibold mb-4">Task Details: {params.id}</h1>
			{/* TODO: Fetch and display details for task with ID params.id */}
			<p>Detailed information for task {params.id} goes here...</p>
		</div>
	);
}
