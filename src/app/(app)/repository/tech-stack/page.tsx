import { TechStackPicker } from "@/components/tech-stack/tech-stack-picker";

export default function TechStack() {
	return (
		<div className="container mx-auto py-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold mb-2">Tech Stack Management</h1>
				<p className="text-muted-foreground">
					View and manage application configurations and their technology
					stacks, including both external and local packages.
				</p>
			</div>
			<TechStackPicker />
		</div>
	);
}
