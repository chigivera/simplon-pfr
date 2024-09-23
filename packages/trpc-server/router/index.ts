import { inferRouterOutputs } from '@trpc/server'
import { router} from '../trpc'

import { authRoutes } from './auth'
import { communityRoutes} from './community'
import { eventRoutes } from './event'
import { subscriptionRoutes } from './subscription'
import { navigationRoutes} from './navigation'
export const appRouter = router({
    navigation:navigationRoutes,
    auth:authRoutes,
    community:communityRoutes,
    event:eventRoutes,
    upgrade:subscriptionRoutes
})

export type AppRouter = typeof appRouter

export type AppRouterType = inferRouterOutputs<AppRouter>

