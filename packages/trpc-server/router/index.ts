import { inferRouterOutputs } from '@trpc/server'
import { router} from '../trpc'

import { authRoutes } from './auth'
import { communityRoutes} from './community'
export const appRouter = router({

    auth:authRoutes,
    community:communityRoutes
})

export type AppRouter = typeof appRouter

export type AppRouterType = inferRouterOutputs<AppRouter>

