import { TRPCError } from "@trpc/server";
import {
  dateSchema,
  formSchemaCommunity,
  formSchemaCommunityCreate,
  formSchemaMemberDelete,
  formSchemaMembers,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";

export const communityRoutes = router({
  commnunities: publicProcedure.query(({}) => {
    return prisma.community.findMany();
  }),
  community: publicProcedure
    .input(formSchemaCommunity)
    .query(({ input: { community_id } }) => {
      return prisma.community.findUnique({ where: { community_id } });
    }),
  owner: privateProcedure("individual", "organization").query(
    async ({ ctx }) => {
      const uid = ctx.uid;
      const community = await prisma.community.findUnique({ where: { uid } });
      if (!community) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Community with ID ${uid} not found.`,
        });
      }
      return community;
    }
  ),
  create: privateProcedure("individual", "organization")
    .input(formSchemaCommunityCreate)
    .mutation(async ({ input: { name, description, uid, image, tags } }) => {
      const newCommunity = await prisma.community.create({
        data: {
          community_id: uuid(), // Generate a unique ID for the community
          name,
          description: description || null, // Allow description to be optional
          uid: uid || "",
          image: image || "",
          tags: {
            connectOrCreate:
              tags?.map((tag) => ({
                where: { name: tag.name },
                create: { name: tag.name },
              })) || [],
          },
        },
      });

      return {
        message: "Community created successfully",
        community: newCommunity,
      };
    }),
  getMembers: privateProcedure("individual", "organization")
    .input(formSchemaMembers)
    .query(async ({ input }) => {
      // Fetch members from the community with pagination
      const [members, total] = await Promise.all([
        prisma.community.findMany({
          where: { community_id: input.community_id },
          include: {
            members: {
              include: {
                user: {
                  include: {
                    Credentials: true, // Ensure Credentials are included
                  },
                },
              },
            },
          },
          skip: input.page * input.limit, // Pagination logic
          take: input.limit,
        }),
        prisma.community.count({
          where: { community_id: input.community_id }, // Count total members
        }),
      ]);

      // Transform output to match members interface
      const transformedMembers = members.map((member) => ({
        uid: member.uid,
        name: member.name, // Accessing user name correctly
 // Optional chaining for email
        joinDate: member.created_at, // Assuming createdAt is the join date
      }));

      return {
        members: transformedMembers,
        total, // Return total count of members
      };
    }),
   delete: privateProcedure("individual", "organization")
  .input(formSchemaMemberDelete)
  .mutation(async ({ input }) => {
    const { community_id, uid } = input;

    await prisma.community.update({
      where: { community_id },
      data: {
        members: {
          disconnect: { uid } // This will remove the member from the community
        }
      }
    });
    await prisma.member.update({
      where: { uid },
      data: {
        communities: {
          disconnect: { community_id } // This will remove the member from the community
        }
      }
    });

   return true
  })
});
