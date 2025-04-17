import type { Task, TaskDetail } from "./types";

export const MOCK_TASKS: Task[] = [
	{
		id: "TASK-1",
		title: "Implement authentication flow",
		status: "In Progress",
		priority: "High",
		assignee: "John Doe",
		due: "2023-12-31",
	},
	{
		id: "TASK-2",
		title: "Design landing page",
		status: "Todo",
		priority: "Medium",
		assignee: "Jane Smith",
		due: "2023-12-25",
	},
	{
		id: "TASK-3",
		title: "Fix navigation bug",
		status: "Done",
		priority: "Low",
		assignee: "Alex Johnson",
		due: "2023-12-20",
	},
	{
		id: "TASK-4",
		title: "Update documentation",
		status: "Todo",
		priority: "Medium",
		assignee: "Sarah Williams",
		due: "2024-01-05",
	},
	{
		id: "TASK-5",
		title: "Optimize database queries",
		status: "In Progress",
		priority: "High",
		assignee: "Mike Brown",
		due: "2024-01-10",
	},
];

export const TASK_DETAILS: Record<string, TaskDetail> = {
	"TASK-1": {
		id: "TASK-1",
		title: "Implement authentication flow",
		status: "In Progress",
		priority: "High",
		assignee: "John Doe",
		due: "2023-12-31",
		createdAt: "2023-11-15",
		description:
			"Create a secure authentication flow using JWT tokens. The flow should include login, registration, password reset, and email verification. Ensure proper error handling and validation.",
		comments: [
			{
				id: 1,
				author: "Jane Smith",
				content: "Should we use refresh tokens as well?",
				timestamp: "2023-11-16 09:30 AM",
			},
			{
				id: 2,
				author: "John Doe",
				content: "Yes, we should implement refresh tokens for better security.",
				timestamp: "2023-11-16 10:15 AM",
			},
		],
		subtasks: [
			{ id: "ST-1", title: "Design login UI", completed: true },
			{ id: "ST-2", title: "Implement JWT authentication", completed: false },
			{ id: "ST-3", title: "Add password reset flow", completed: false },
		],
	},
	// Add more task details as needed
};

export const getTaskDetail = (id: string): TaskDetail => {
	return (
		TASK_DETAILS[id] || {
			...(MOCK_TASKS.find((task) => task.id === id) || MOCK_TASKS[0]),
			createdAt: "2023-11-15",
			description: "Task description not available.",
			comments: [],
			subtasks: [],
		}
	);
};
