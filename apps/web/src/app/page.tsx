"use client";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
export default function Home() {
  const { data } = trpcClient.auth.users.useQuery();
  const { data: userData } = useSession();
  return (
    <main>
      Hello {JSON.stringify(data)}
      <div>
        {userData?.user ? (
          <button onClick={() => signOut()}>signout</button>
        ) : (
          <Link href={"/signin"}>Sign in</Link>
        )}
      </div>
    </main>
  );
}
