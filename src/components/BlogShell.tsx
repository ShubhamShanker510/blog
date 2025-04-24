"use client";

import { SessionProvider } from "next-auth/react";
import NavBar from "@/components/Navigation";

export default function BlogShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <NavBar />
      {children}
    </SessionProvider>
  );
}
