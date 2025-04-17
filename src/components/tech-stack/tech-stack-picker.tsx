"use client";

import { mockAppConfigs, mockPackages } from "@/lib/mock-data";
import type {
	AppConfig,
	Package,
	PackageCategory,
	ViewMode,
} from "@/types/tech-stack";
import { useState } from "react";
import { AppConfigEdit } from "./app-config-edit";
import { DocUrlDialog } from "./doc-url-dialog";
import { PackageCard } from "./package-card";
import { PackageTableView } from "./package-table-view";
import { ViewToggle } from "./view-toggle";

export function TechStackPicker() {
	const [selectedConfigId, setSelectedConfigId] = useState<string>("common");
	const [viewMode, setViewMode] = useState<ViewMode>("card");
	const [appConfigs, setAppConfigs] = useState<AppConfig[]>(mockAppConfigs);
	const [packages, setPackages] = useState<Package[]>(mockPackages);

	// Dialog state for editing doc URL
	const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
	const [editingPackageId, setEditingPackageId] = useState("");
	const [editingDocUrl, setEditingDocUrl] = useState("");

	// Get the current config
	const currentConfig =
		appConfigs.find((config) => config.id === selectedConfigId) ||
		appConfigs[0];

	// Get packages for the selected config
	const getConfigPackages = () => {
		if (!currentConfig) return [];
		return packages.filter((pkg) => currentConfig.packages.includes(pkg.id));
	};

	const configPackages = getConfigPackages();

	// Handle config change
	const handleConfigChange = (configId: string) => {
		setSelectedConfigId(configId);
	};

	// Handle view mode toggle
	const handleViewModeToggle = (mode: ViewMode) => {
		setViewMode(mode);
	};

	// Open doc URL edit dialog
	const openDocUrlDialog = (packageId: string, currentUrl: string) => {
		setEditingPackageId(packageId);
		setEditingDocUrl(currentUrl);
		setIsDocDialogOpen(true);
	};

	// Save doc URL changes
	const saveDocUrl = (packageId: string, newUrl: string) => {
		setPackages((prev) =>
			prev.map((pkg) =>
				pkg.id === packageId ? { ...pkg, docsUrl: newUrl } : pkg,
			),
		);
	};

	// Save app config changes
	const saveAppConfig = (id: string, name: string, filePath: string) => {
		setAppConfigs((prev) =>
			prev.map((config) =>
				config.id === id ? { ...config, name, filePath } : config,
			),
		);
	};

	// Group packages by category
	const packagesByCategory: Record<PackageCategory, Package[]> = {
		backend: [],
		frontend: [],
		database: [],
		logging: [],
		testing: [],
		hosting: [],
		cicd: [],
		monitoring: [],
		documentation: [],
		other: [],
	};

	for (const pkg of configPackages) {
		packagesByCategory[pkg.category].push(pkg);
	}

	// Category labels for display
	const categoryLabels: Record<PackageCategory, string> = {
		backend: "Backend",
		frontend: "Frontend",
		database: "Database",
		logging: "Logging",
		testing: "Testing",
		hosting: "Hosting",
		cicd: "CI/CD and Deployment",
		monitoring: "Monitoring",
		documentation: "Documentation",
		other: "Others",
	};

	return (
		<div className="space-y-8">
			{/* App Configurations */}
			<div className="space-y-4">
				<div className="flex items-center justify-between">
					<h2 className="text-xl font-semibold">App Configuration</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{appConfigs.map((config) => (
						<button
							type="button"
							key={config.id}
							className={`p-4 border rounded-lg ${
								config.isLocal
									? "border-indigo-200 dark:border-indigo-800"
									: "border-gray-200 dark:border-gray-800"
							} transition-all w-full text-left hover:shadow-sm ${
								selectedConfigId === config.id
									? "bg-primary/5 border-primary"
									: "hover:border-primary/30 bg-white dark:bg-gray-900"
							}`}
							onClick={() => handleConfigChange(config.id)}
							aria-pressed={selectedConfigId === config.id}
						>
							<AppConfigEdit config={config} onSave={saveAppConfig} />
						</button>
					))}
				</div>
			</div>

			{/* Package display section */}
			<div className="space-y-4">
				<div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold">
						{currentConfig?.name || "Tech Stack"} Packages
						<span className="ml-2 text-sm text-muted-foreground">
							({configPackages.length} packages)
						</span>
					</h2>
					<ViewToggle viewMode={viewMode} onToggle={handleViewModeToggle} />
				</div>

				{/* No packages message */}
				{configPackages.length === 0 && (
					<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8 text-center">
						<p className="text-muted-foreground">
							No packages found in this configuration.
						</p>
					</div>
				)}

				{/* Render packages based on view mode */}
				{configPackages.length > 0 &&
					(Object.keys(packagesByCategory) as PackageCategory[]).map(
						(category) => {
							const categoryPackages = packagesByCategory[category];
							if (categoryPackages.length === 0) return null;

							if (viewMode === "table") {
								return (
									<PackageTableView
										key={category}
										packages={categoryPackages}
										onEditDocs={openDocUrlDialog}
										categoryLabel={categoryLabels[category]}
									/>
								);
							}

							return (
								<div key={category} className="space-y-4 mt-6">
									<h3 className="text-lg font-medium border-b pb-2 border-gray-200 dark:border-gray-800">
										{categoryLabels[category]}
										<span className="ml-2 text-sm text-muted-foreground">
											({categoryPackages.length})
										</span>
									</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
										{categoryPackages.map((pkg) => (
											<PackageCard
												key={pkg.id}
												pkg={pkg}
												onEditDocs={openDocUrlDialog}
											/>
										))}
									</div>
								</div>
							);
						},
					)}
			</div>

			{/* Doc URL Dialog */}
			<DocUrlDialog
				isOpen={isDocDialogOpen}
				packageId={editingPackageId}
				initialUrl={editingDocUrl}
				onClose={() => setIsDocDialogOpen(false)}
				onSave={saveDocUrl}
			/>
		</div>
	);
}
