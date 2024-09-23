import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@ntla9aw/trpc-server/router'
import superjson from "superjson";

export const trpcStatic = createTRPCProxyClient<AppRouter>({
  transformer: superjson,

  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
    }),
  ],
})