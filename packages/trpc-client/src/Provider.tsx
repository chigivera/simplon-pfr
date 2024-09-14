"use client";

import { trpcClient as trpc } from "./client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React,{ useState } from "react";
import superjson from "superjson";
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: "http://localhost:8080/trpc", // replace with your actual server URL
          async headers() {
            return {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJheW1hbiJ9.gIRx_bkzwUW8NeaQOHYDirEvjdiiCnp1T7gBmgdx2Do",
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
