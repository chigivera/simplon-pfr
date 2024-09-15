import { TRPCError } from "@trpc/server";
import {
  formSchemaCommunity,
  formSchemaCommunityCreate,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";

export const communityRoutes = router({
  commnunities: publicProcedure.query(({ ctx }) => {
    return prisma.community.findMany();
  }),
  community: publicProcedure
    .input(formSchemaCommunity)
    .query(({ ctx, input: { community_id } }) => {
      return prisma.community.findUnique({ where: { community_id } });
    }),
  create: privateProcedure
    .input(formSchemaCommunityCreate)
    .mutation(async ({ ctx, input: {name,description,uid} }) => {

      const newCommunity = await prisma.community.create({
        data: {
          community_id: uuid(), // Generate a unique ID for the community
          name,
          description: description || null, // Allow description to be optional
          uid: uid || '',
        },
      });

      return {
        message: "Community created successfully",
        community: newCommunity,
      };

    }),
});
