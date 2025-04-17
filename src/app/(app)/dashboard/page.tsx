import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
	return (
		<div className="p-6 space-y-6">
			<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

			<Tabs defaultValue="overview" className="space-y-4">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="analytics">Analytics</TabsTrigger>
					<TabsTrigger value="reports">Reports</TabsTrigger>
				</TabsList>

				<TabsContent value="overview" className="space-y-4">
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle>Total Tasks</CardTitle>
								<CardDescription>Task count across project</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">24</div>
								<p className="text-xs text-muted-foreground">
									+10% from last week
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle>Completed</CardTitle>
								<CardDescription>Finished tasks</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">12</div>
								<p className="text-xs text-muted-foreground">
									50% completion rate
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle>In Progress</CardTitle>
								<CardDescription>Active development</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">8</div>
								<p className="text-xs text-muted-foreground">4 high priority</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Latest project updates</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Activity timeline goes here...</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="analytics" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Analytics Dashboard</CardTitle>
							<CardDescription>Project performance metrics</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Analytics content goes here...</p>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="reports" className="space-y-4">
					<Card>
						<CardHeader>
							<CardTitle>Reports</CardTitle>
							<CardDescription>Project reports and exports</CardDescription>
						</CardHeader>
						<CardContent>
							<p>Reports content goes here...</p>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
