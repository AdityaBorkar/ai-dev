import { Plus } from "lucide-react";
import type React from "react";

interface HeaderActionsProps {
	onCreateTask?: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
	onCreateTask = () => {},
}) => {
	return (
		<button
			type="button"
			className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium flex items-center"
			onClick={onCreateTask}
		>
			<Plus size={16} className="mr-1" />
			New Task
		</button>
	);
};
