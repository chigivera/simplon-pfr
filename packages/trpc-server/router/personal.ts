import { privateProcedure, router } from '../trpc';
import { prisma } from "@ntla9aw/db";
import { formSchemaCommunityy, formSchemaTag } from '@ntla9aw/forms/src/schemas';
import { v4 as uuid } from "uuid";

export const personalRoutes = router({
  getDashboardData: privateProcedure("member").query(async ({ ctx }) => {
    const userId = ctx.uid;

    const user = await prisma.user.findUnique({
      where: { uid: userId },
      include: {
        Member: {
          include: {
            communities: {
              include: {
                events: true,
                _count: {
                  select: { members: true },
                },
              },
            },
          },
        },
        tags: true,
        Ticket: {
          include: {
            event: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const communities = user.Member?.communities.map((community) => ({
      id: community.community_id,
      name: community.name,
      image: community.image || '/placeholder.svg?height=32&width=32',
      members: community._count.members,
    })) || [];

    const upcomingEvents = user.Member?.communities
      .flatMap((community) => community.events)
      .filter((event) => new Date(event.date) > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5)
      .map((event) => ({
        id: event.event_id,
        title: event.title,
        date: event.date.toISOString(),
        community: communities.find((c) => c.id === event.community_id)?.name || 'Unknown',
      })) || [];

    const userTags = user.tags.map((tag) => tag.name);

    const ticketedEvents = user.Ticket.map((ticket) => ({
      id: ticket.event.event_id,
      title: ticket.event.title,
      date: ticket.event.date.toISOString(),
      status: ticket.status,
    }));

    return {
      communities,
      upcomingEvents,
      userTags,
      ticketedEvents,
    };
  }),

  joinCommunity: privateProcedure("member")
    .input(formSchemaCommunityy)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.uid;

      const member = await prisma.member.upsert({
        where: { uid: userId },
        update: {
          communities: {
            connect: { community_id: input.communityId },
          },
        },
        create: {
          uid: userId || uuid(),
          communities: {
            connect: { community_id: input.communityId },
          },
        },
      });

      return { success: true, member };
    }),

  leaveCommunity: privateProcedure("member")
    .input(formSchemaCommunityy)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.uid;

      await prisma.member.update({
        where: { uid: userId },
        data: {
          communities: {
            disconnect: { community_id: input.communityId },
          },
        },
      });

      return { success: true };
    }),

  updateUserTags: privateProcedure("member")
    .input(formSchemaTag)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.uid;

      await prisma.user.update({
        where: { uid: userId },
        data: {
          tags: {
            set: input.tags.map((tag) => ({ name: tag })),
          }
        },
      });

      return { success: true };
    }),
    getUserEvents: privateProcedure("member").query(async ({ ctx }) => {
        const userId = ctx.uid;
    
        const userTickets = await prisma.ticket.findMany({
          where: { uid: userId },
          include: {
            event: {
              include: {
                community: true,
              },
            },
          },
        });
    
        const events = userTickets.map((ticket) => ({
          id: ticket.event.event_id,
          title: ticket.event.title,
          date: ticket.event.date,
          type: ticket.event.type,
          community: ticket.event.community?.name || 'Unknown',
          status: ticket.status,
        }));
    
        return events;
      }),
});
