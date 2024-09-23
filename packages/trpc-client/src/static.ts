import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import { AppRouter } from '@ntla9aw/trpc-server/router'

export const trpcStatic = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.NEXT_PUBLIC_API_URL + '/trpc',
    }),
  ],
})