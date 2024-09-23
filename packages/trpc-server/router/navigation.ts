import {  publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";

export const navigationRoutes = router({
  cities: publicProcedure.query(() => {
    return prisma.city.findMany();
  }),
  tags: publicProcedure.query(() => {
    return prisma.tag.findMany();
  }),
});
