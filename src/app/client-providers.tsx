"use client";

import { Provider } from "jotai";

export function ClientProviders({ children }: { children: React.ReactNode }) {
	return <Provider>{children}</Provider>;
}
