import { redirect } from "next/navigation";

export default function RepositoryPage() {
	// If not a monorepo, show the results here itself.
	return <div>MONOREPO</div>;
}
