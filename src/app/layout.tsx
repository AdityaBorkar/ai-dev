import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import {
	Geist,
	Geist_Mono,
	// Archivo,
	// IBM_Plex_Sans,
	// Manrope,
	// Work_Sans,
} from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = { title: "AI Developer" };

// TODO: Entire thing is a SPA in Bun with React Router.

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					geistSans.variable,
					geistMono.variable,
					"font-sans bg-background text-foreground antialiased",
				)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
