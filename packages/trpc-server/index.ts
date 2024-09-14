import {createExpressMiddleware} from '@trpc/server/adapters/express'
import { appRouter } from './router'
import { createTRPCContext } from './context'
export const trpcExpress = createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext
})
