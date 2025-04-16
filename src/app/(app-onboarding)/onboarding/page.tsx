"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ProjectOnboardingSchema } from "@/schemas/ProjectOnboarding";

// Default values matching the schema defaults
const defaultValues: Partial<ProjectOnboardingSchema> = {
	projectName: "",
	description: "",
	themeColor: "#000000",
	theme: "light",
	authorName: "",
	isMonorepo: "no",
	projectType: "project",
	aiEditor: "cursor",
	isBlank: "not_blank",
};

export default function OnboardingPage() {
	const form = useForm<ProjectOnboardingSchema>({
		resolver: zodResolver(ProjectOnboardingSchema),
		defaultValues,
		mode: "onChange", // Or "onSubmit"
	});

	function onSubmit(data: ProjectOnboardingSchema) {
		// TODO: Add submit logic
		console.log("Form submitted with data:", data);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full max-w-lg space-y-6 rounded-lg border bg-card p-8 shadow-sm"
				>
					<h1 className="text-2xl font-semibold text-card-foreground">
						Project Onboarding
					</h1>

					<FormField
						control={form.control}
						name="projectName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Name</FormLabel>
								<FormControl>
									<Input placeholder="My Awesome Project" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Describe your project..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="themeColor"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Theme Color</FormLabel>
									<FormControl>
										<Input type="color" className="h-10 w-full" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Theme</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex items-center space-x-4 pt-2"
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="light" id="light" />
												</FormControl>
												<FormLabel htmlFor="light" className="font-normal">
													Light
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="dark" id="dark" />
												</FormControl>
												<FormLabel htmlFor="dark" className="font-normal">
													Dark
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="authorName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Author Name</FormLabel>
								<FormControl>
									<Input placeholder="Ada Lovelace" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="isMonorepo"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Monorepo?</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex items-center space-x-4 pt-2"
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="yes" id="mono-yes" />
												</FormControl>
												<FormLabel htmlFor="mono-yes" className="font-normal">
													Yes
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="no" id="mono-no" />
												</FormControl>
												<FormLabel htmlFor="mono-no" className="font-normal">
													No
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="projectType"
							render={({ field }) => (
								<FormItem className="space-y-2">
									<FormLabel>Type</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex items-center space-x-4 pt-2"
										>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="library" id="type-lib" />
												</FormControl>
												<FormLabel htmlFor="type-lib" className="font-normal">
													Library
												</FormLabel>
											</FormItem>
											<FormItem className="flex items-center space-x-2">
												<FormControl>
													<RadioGroupItem value="project" id="type-proj" />
												</FormControl>
												<FormLabel htmlFor="type-proj" className="font-normal">
													Project
												</FormLabel>
											</FormItem>
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="aiEditor"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Choose AI Editor</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select AI Editor" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="windsurf">Windsurf</SelectItem>
										<SelectItem value="cursor">Cursor</SelectItem>
										<SelectItem value="github_copilot">
											GitHub Copilot
										</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="isBlank"
						render={({ field }) => (
							<FormItem className="space-y-2">
								<FormLabel>Start with</FormLabel>
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="flex items-center space-x-4 pt-2"
									>
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<RadioGroupItem value="blank" id="start-blank" />
											</FormControl>
											<FormLabel htmlFor="start-blank" className="font-normal">
												Blank Project
											</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-2">
											<FormControl>
												<RadioGroupItem
													value="not_blank"
													id="start-not-blank"
												/>
											</FormControl>
											<FormLabel
												htmlFor="start-not-blank"
												className="font-normal"
											>
												Template
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" className="w-full">
						Complete Onboarding
					</Button>
				</form>
			</Form>
		</div>
	);
}
