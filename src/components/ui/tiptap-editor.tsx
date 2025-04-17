"use client";

import { cn } from "@/lib/utils";
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import {
	Bold as BoldIcon,
	Code as CodeIcon,
	Heading1,
	Heading2,
	Heading3,
	Italic as ItalicIcon,
	List,
	ListOrdered,
} from "lucide-react";
import { Button } from "./button";

interface TipTapEditorProps {
	content: string;
	onChange: (content: string) => void;
	className?: string;
}

export function TipTapEditor({
	content,
	onChange,
	className,
}: TipTapEditorProps) {
	const editor = useEditor({
		extensions: [
			Document,
			Paragraph,
			Text,
			Heading.configure({
				levels: [1, 2, 3],
			}),
			Bold,
			Italic,
			Code,
			CodeBlock,
			BulletList,
			OrderedList,
			ListItem,
		],
		content,
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	if (!editor) {
		return null;
	}

	return (
		<div className={cn("border rounded-md overflow-hidden", className)}>
			<div className="flex items-center gap-1 border-b p-2 bg-gray-50">
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={editor.isActive("bold") ? "bg-gray-200" : ""}
				>
					<BoldIcon className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={editor.isActive("italic") ? "bg-gray-200" : ""}
				>
					<ItalicIcon className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
					className={
						editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
					}
				>
					<Heading1 className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
					className={
						editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
					}
				>
					<Heading2 className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
					className={
						editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
					}
				>
					<Heading3 className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
				>
					<List className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
				>
					<ListOrdered className="h-4 w-4" />
				</Button>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => editor.chain().focus().toggleCode().run()}
					className={editor.isActive("code") ? "bg-gray-200" : ""}
				>
					<CodeIcon className="h-4 w-4" />
				</Button>
			</div>
			<EditorContent
				editor={editor}
				className="p-4 prose prose-sm max-w-none min-h-[200px] focus-visible:outline-none"
			/>
		</div>
	);
}
