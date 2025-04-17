"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	PiClockCountdown,
	PiCodeBlock,
	PiGitCommit,
	PiRadioButton,
	PiTimer,
	PiWarningCircle,
} from "react-icons/pi";
import {
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	LineChart,
	Line,
	AreaChart,
	Area,
} from "recharts";

// Mock data - would be replaced with actual data from API
const stats = {
	tokens: {
		total: 2475000,
		lastMonth: 850000,
		average: 7500,
		byModel: [
			{ name: "Claude 3 Opus", value: 1200000 },
			{ name: "Claude 3 Sonnet", value: 875000 },
			{ name: "GPT-4", value: 400000 },
		],
		monthly: [
			{ month: "Jan", tokens: 320000 },
			{ month: "Feb", tokens: 290000 },
			{ month: "Mar", tokens: 330000 },
			{ month: "Apr", tokens: 450000 },
			{ month: "May", tokens: 560000 },
			{ month: "Jun", tokens: 525000 },
		],
	},
	time: {
		total: 120, // hours
		average: 25, // minutes per task
		byPhase: [
			{ name: "Planning", value: 30 },
			{ name: "Development", value: 65 },
			{ name: "Testing", value: 15 },
			{ name: "Refinement", value: 10 },
		],
		monthly: [
			{ month: "Jan", hours: 15 },
			{ month: "Feb", hours: 18 },
			{ month: "Mar", hours: 22 },
			{ month: "Apr", hours: 25 },
			{ month: "May", hours: 20 },
			{ month: "Jun", hours: 20 },
		],
	},
	errors: {
		total: 156,
		resolved: 142,
		byType: [
			{ name: "Syntax", value: 42 },
			{ name: "Logic", value: 38 },
			{ name: "Integration", value: 26 },
			{ name: "Performance", value: 15 },
			{ name: "Other", value: 35 },
		],
		trend: [
			{ week: "W1", reported: 28, resolved: 24 },
			{ week: "W2", reported: 32, resolved: 30 },
			{ week: "W3", reported: 36, resolved: 32 },
			{ week: "W4", reported: 30, resolved: 27 },
			{ week: "W5", reported: 22, resolved: 21 },
			{ week: "W6", reported: 8, resolved: 8 },
		],
	},
	cycles: {
		count: 12,
		averageTime: 10, // hours
		averageTokens: 206250,
		averageCommits: 14,
		averageLOC: 780,
		repromptRate: 2.4, // average reprompts per task
		data: [
			{
				id: 1,
				time: 12,
				tokens: 220000,
				commits: 16,
				loc: 850,
				reprompts: 3.1,
			},
			{ id: 2, time: 9, tokens: 190000, commits: 12, loc: 720, reprompts: 2.3 },
			{
				id: 3,
				time: 11,
				tokens: 240000,
				commits: 15,
				loc: 820,
				reprompts: 2.7,
			},
			{ id: 4, time: 8, tokens: 180000, commits: 11, loc: 650, reprompts: 1.9 },
			{
				id: 5,
				time: 10,
				tokens: 210000,
				commits: 14,
				loc: 790,
				reprompts: 2.2,
			},
			{
				id: 6,
				time: 10,
				tokens: 200000,
				commits: 13,
				loc: 760,
				reprompts: 2.0,
			},
			{ id: 7, time: 9, tokens: 195000, commits: 12, loc: 730, reprompts: 2.1 },
			{
				id: 8,
				time: 11,
				tokens: 220000,
				commits: 15,
				loc: 800,
				reprompts: 2.6,
			},
			{
				id: 9,
				time: 10,
				tokens: 210000,
				commits: 14,
				loc: 770,
				reprompts: 2.4,
			},
			{
				id: 10,
				time: 9,
				tokens: 195000,
				commits: 13,
				loc: 740,
				reprompts: 2.2,
			},
			{
				id: 11,
				time: 12,
				tokens: 230000,
				commits: 16,
				loc: 830,
				reprompts: 2.8,
			},
			{
				id: 12,
				time: 10,
				tokens: 205000,
				commits: 14,
				loc: 780,
				reprompts: 2.3,
			},
		],
	},
};

// Custom chart colors from CSS variables
const chartColors = [
	"var(--chart-1)",
	"var(--chart-2)",
	"var(--chart-3)",
	"var(--chart-4)",
	"var(--chart-5)",
];

export default function StatsPage() {
	return (
		<div className="p-6 space-y-6">
			<h1 className="text-3xl font-bold tracking-tight">Usage Statistics</h1>

			<Tabs defaultValue="overview" className="space-y-6">
				<TabsList>
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="tokens">Tokens</TabsTrigger>
					<TabsTrigger value="time">Time</TabsTrigger>
					<TabsTrigger value="errors">Errors</TabsTrigger>
					<TabsTrigger value="cycles">Cycles</TabsTrigger>
				</TabsList>

				{/* Overview Tab */}
				<TabsContent value="overview" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Total Tokens
								</CardTitle>
								<PiCodeBlock className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.tokens.total.toLocaleString()}
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									~{stats.tokens.average.toLocaleString()} per task
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Development Time
								</CardTitle>
								<PiTimer className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.time.total} hours
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									{stats.time.average} min average per task
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">Errors</CardTitle>
								<PiWarningCircle className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stats.errors.total}</div>
								<p className="text-xs text-muted-foreground mt-1">
									{stats.errors.resolved} resolved (
									{Math.round(
										(stats.errors.resolved / stats.errors.total) * 100,
									)}
									%)
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Development Cycles
								</CardTitle>
								<PiClockCountdown className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">{stats.cycles.count}</div>
								<p className="text-xs text-muted-foreground mt-1">
									{stats.cycles.averageLOC.toLocaleString()} lines of code on
									average
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<Card>
							<CardHeader>
								<CardTitle>Time Allocation</CardTitle>
								<CardDescription>Development hours by phase</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie
												data={stats.time.byPhase}
												cx="50%"
												cy="50%"
												innerRadius={60}
												outerRadius={100}
												paddingAngle={2}
												dataKey="value"
												label={({ name, percent }) =>
													`${name} (${percent ? (percent * 100).toFixed(0) : "0"}%)`
												}
												labelLine={false}
											>
												{stats.time.byPhase.map((entry, index) => (
													<Cell
														key={`cell-time-${entry.name}`}
														fill={chartColors[index % chartColors.length]}
													/>
												))}
											</Pie>
											<Tooltip
												formatter={(value) => [`${value} hours`, "Time"]}
											/>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Token Usage</CardTitle>
								<CardDescription>Distribution by model</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie
												data={stats.tokens.byModel}
												cx="50%"
												cy="50%"
												innerRadius={60}
												outerRadius={100}
												paddingAngle={2}
												dataKey="value"
												label={({ name, percent }) =>
													`${name} (${percent ? (percent * 100).toFixed(0) : "0"}%)`
												}
												labelLine={false}
											>
												{stats.tokens.byModel.map((entry, index) => (
													<Cell
														key={`cell-token-${entry.name}`}
														fill={chartColors[index % chartColors.length]}
													/>
												))}
											</Pie>
											<Tooltip
												formatter={(value) => [
													`${(value / 1000000).toFixed(1)}M`,
													"Tokens",
												]}
											/>
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				{/* Tokens Tab */}
				<TabsContent value="tokens" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Token Usage</CardTitle>
								<CardDescription>Total and average consumption</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Total Used
									</h3>
									<p className="text-3xl font-bold">
										{stats.tokens.total.toLocaleString()}
									</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Last Month
									</h3>
									<p className="text-3xl font-bold">
										{stats.tokens.lastMonth.toLocaleString()}
									</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Average Per Task
									</h3>
									<p className="text-3xl font-bold">
										{stats.tokens.average.toLocaleString()}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Token Distribution by Model</CardTitle>
								<CardDescription>
									Usage across different AI models
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={stats.tokens.byModel}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis tickFormatter={(value) => `${value / 1000000}M`} />
											<Tooltip
												formatter={(value) => [
													`${(value / 1000000).toFixed(1)}M tokens`,
													"Usage",
												]}
											/>
											<Bar
												dataKey="value"
												fill="var(--chart-1)"
												radius={[4, 4, 0, 0]}
											>
												{stats.tokens.byModel.map((entry, index) => (
													<Cell
														key={`cell-bar-${entry.name}`}
														fill={chartColors[index % chartColors.length]}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Token Usage Over Time</CardTitle>
							<CardDescription>Monthly consumption trends</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<AreaChart data={stats.tokens.monthly}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis tickFormatter={(value) => `${value / 1000}k`} />
										<Tooltip
											formatter={(value) => [
												`${(value / 1000).toFixed(0)}k tokens`,
												"Usage",
											]}
										/>
										<Area
											type="monotone"
											dataKey="tokens"
											stroke="var(--chart-1)"
											fill="var(--chart-1)"
											fillOpacity={0.2}
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Time Tab */}
				<TabsContent value="time" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Time Metrics</CardTitle>
								<CardDescription>Development time statistics</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Total Hours
									</h3>
									<p className="text-3xl font-bold">{stats.time.total}</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Average per Task
									</h3>
									<p className="text-3xl font-bold">{stats.time.average} min</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Cycle Average
									</h3>
									<p className="text-3xl font-bold">
										{stats.cycles.averageTime} hours
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Time Distribution by Phase</CardTitle>
								<CardDescription>
									Hours spent in each development phase
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart layout="vertical" data={stats.time.byPhase}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis type="number" />
											<YAxis dataKey="name" type="category" width={100} />
											<Tooltip
												formatter={(value) => [`${value} hours`, "Time"]}
											/>
											<Bar dataKey="value" radius={[0, 4, 4, 0]}>
												{stats.time.byPhase.map((entry, index) => (
													<Cell
														key={`cell-time-bar-${entry.name}`}
														fill={chartColors[index % chartColors.length]}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Time Spent Over Time</CardTitle>
							<CardDescription>Monthly development hours</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={stats.time.monthly}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="month" />
										<YAxis />
										<Tooltip
											formatter={(value) => [
												`${value} hours`,
												"Development Time",
											]}
										/>
										<Line
											type="monotone"
											dataKey="hours"
											stroke="var(--chart-2)"
											strokeWidth={2}
											dot={{ r: 4, strokeWidth: 1 }}
											activeDot={{ r: 6 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Errors Tab */}
				<TabsContent value="errors" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle>Error Analysis</CardTitle>
								<CardDescription>Bug and error metrics</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Total Errors
									</h3>
									<p className="text-3xl font-bold">{stats.errors.total}</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Resolved
									</h3>
									<p className="text-3xl font-bold">
										{stats.errors.resolved}{" "}
										<span className="text-sm text-muted-foreground">
											(
											{Math.round(
												(stats.errors.resolved / stats.errors.total) * 100,
											)}
											%)
										</span>
									</p>
								</div>
								<div>
									<h3 className="text-sm font-medium text-muted-foreground mb-2">
										Outstanding
									</h3>
									<p className="text-3xl font-bold">
										{stats.errors.total - stats.errors.resolved}
									</p>
								</div>
							</CardContent>
						</Card>

						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle>Error Types</CardTitle>
								<CardDescription>
									Distribution of errors by category
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-[300px]">
									<ResponsiveContainer width="100%" height="100%">
										<BarChart data={stats.errors.byType}>
											<CartesianGrid strokeDasharray="3 3" />
											<XAxis dataKey="name" />
											<YAxis />
											<Tooltip
												formatter={(value) => [`${value} errors`, "Count"]}
											/>
											<Bar dataKey="value" radius={[4, 4, 0, 0]}>
												{stats.errors.byType.map((entry, index) => (
													<Cell
														key={`cell-error-${entry.name}`}
														fill={chartColors[index % chartColors.length]}
													/>
												))}
											</Bar>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Error Resolution Trend</CardTitle>
							<CardDescription>Weekly reported vs. resolved</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={stats.errors.trend}>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis dataKey="week" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Line
											type="monotone"
											dataKey="reported"
											name="Reported Errors"
											stroke="var(--chart-3)"
											strokeWidth={2}
											dot={{ r: 4, strokeWidth: 1 }}
										/>
										<Line
											type="monotone"
											dataKey="resolved"
											name="Resolved Errors"
											stroke="var(--chart-1)"
											strokeWidth={2}
											dot={{ r: 4, strokeWidth: 1 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* Cycles Tab */}
				<TabsContent value="cycles" className="space-y-6">
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Average Time
								</CardTitle>
								<PiTimer className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.cycles.averageTime} hours
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Average Tokens
								</CardTitle>
								<PiCodeBlock className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.cycles.averageTokens.toLocaleString()}
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Average Commits
								</CardTitle>
								<PiGitCommit className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.cycles.averageCommits}
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									Per development cycle
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Re-prompt Rate
								</CardTitle>
								<PiRadioButton className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">
									{stats.cycles.repromptRate}
								</div>
								<p className="text-xs text-muted-foreground mt-1">
									Average re-prompts per task
								</p>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>Cycle Comparison</CardTitle>
							<CardDescription>
								Time and token usage across cycles
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="h-[350px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={stats.cycles.data}
										margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
									>
										<CartesianGrid strokeDasharray="3 3" />
										<XAxis
											dataKey="id"
											label={{
												value: "Cycle #",
												position: "insideBottom",
												offset: -10,
											}}
										/>
										<YAxis
											yAxisId="left"
											orientation="left"
											label={{
												value: "Time (hours)",
												angle: -90,
												position: "insideLeft",
											}}
										/>
										<YAxis
											yAxisId="right"
											orientation="right"
											tickFormatter={(value) => `${value / 1000}k`}
											label={{
												value: "Tokens",
												angle: 90,
												position: "insideRight",
											}}
										/>
										<Tooltip />
										<Legend />
										<Bar
											yAxisId="left"
											dataKey="time"
											name="Time (hours)"
											fill="var(--chart-1)"
										/>
										<Bar
											yAxisId="right"
											dataKey="tokens"
											name="Tokens"
											fill="var(--chart-2)"
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Cycle Efficiency</CardTitle>
							<CardDescription>Metrics for development cycles</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h3 className="text-sm font-medium mb-4">
										Time vs Output Ratio
									</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<div className="flex justify-between text-sm">
												<span>Time per 1k lines</span>
												<span className="font-medium">
													{(
														(stats.cycles.averageTime /
															stats.cycles.averageLOC) *
														1000
													).toFixed(2)}{" "}
													hours
												</span>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span>Tokens per 1k lines</span>
													<span className="font-medium">
														{(
															(stats.cycles.averageTokens /
																stats.cycles.averageLOC) *
															1000
														).toFixed(0)}
													</span>
												</div>
											</div>
											<div className="space-y-2">
												<div className="flex justify-between text-sm">
													<span>Commits per 1k lines</span>
													<span className="font-medium">
														{(
															(stats.cycles.averageCommits /
																stats.cycles.averageLOC) *
															1000
														).toFixed(2)}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<h3 className="text-sm font-medium mb-4">
										Re-prompt Analysis
									</h3>
									<div className="space-y-4">
										<ResponsiveContainer width="100%" height={100}>
											<BarChart
												data={[
													{
														name: "Re-prompts",
														value: stats.cycles.repromptRate,
													},
												]}
												layout="vertical"
												margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
											>
												<XAxis type="number" domain={[0, 5]} hide />
												<Tooltip
													formatter={(value) => [
														`${value} per task`,
														"Re-prompt Rate",
													]}
												/>
												<Bar
													dataKey="value"
													fill="var(--chart-1)"
													radius={[0, 4, 4, 0]}
												>
													<Cell fill="var(--chart-1)" />
													{/* Add industry average reference line */}
													<Cell
														x={3.5}
														width={0.5}
														fill="var(--chart-3)"
														radius={0}
													/>
												</Bar>
											</BarChart>
										</ResponsiveContainer>
										<p className="text-xs text-muted-foreground mt-2">
											Scale: 0-5 re-prompts per task (industry average ~3.5)
										</p>
										<div className="space-y-2 mt-6">
											<div className="flex justify-between text-sm">
												<span>Time lost to re-prompting</span>
												<span className="font-medium">
													{(
														stats.cycles.repromptRate *
														stats.time.average *
														0.3
													).toFixed(0)}{" "}
													min/task
												</span>
											</div>
											<p className="text-xs text-muted-foreground mt-2">
												Estimated based on average task time and re-prompt rate
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
