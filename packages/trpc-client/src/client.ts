import { createTRPCReact } from "@trpc/react-query";

import { AppRouter } from "@ntla9aw/trpc-server/router";
export const trpcClient = createTRPCReact<AppRouter>();
