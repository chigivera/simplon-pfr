import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { AppRouter } from "@ntla9aw/trpc-server/router";
import superjson from "superjson";
export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "http://localhost:8080/trpc",
      async headers() {
        return {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiJheW1hbiJ9.gIRx_bkzwUW8NeaQOHYDirEvjdiiCnp1T7gBmgdx2Do",
        };
      },
    }),
  ],
});
