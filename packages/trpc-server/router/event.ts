import { TRPCError } from "@trpc/server";
import {
  formSchemaCommunity,
  formSchemaCommunityCreate,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";

export const routes = router({
  commnunities: publicProcedure.query(({ ctx }) => {
    return prisma.user.findMany();
  }),
  community: publicProcedure
    .input(formSchemaCommunity)
    .query(({ ctx, input: { uid } }) => {
      return prisma.user.findUnique({ where: { uid } });
    }),
  create: privateProcedure
    .input(formSchemaCommunityCreate)
    .mutation(({ ctx, input: {} }) => {}),
});
