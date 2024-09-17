// ClientSessionProvider.tsx
"use client"; // This makes it a client component

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";

interface SessionProviderProps {
    children: ReactNode;
    session: Session | null;
  }
export default function SessionProvider({ children, session }: SessionProviderProps) {
  return <NextAuthSessionProvider session={session}>{children}</NextAuthSessionProvider>;
}