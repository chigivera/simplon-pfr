import { formEventTitle } from "@ntla9aw/forms/src/schemas";
import {  publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";

export const navigationRoutes = router({
  cities: publicProcedure.query(() => {
    return prisma.city.findMany();
  }),
  tags: publicProcedure.query(() => {
    return prisma.tag.findMany();
  }),
  eventNames: publicProcedure
    .input(formEventTitle)
    .query(async ({ input }) => {
      const events = await prisma.event.findMany({
        select: {
          title: true,
        },
        where: {
          title: {
            contains: input.title || undefined,
            mode: 'insensitive',
          },
        },
      });
      return events.map(event => event.title);
    }),
});
