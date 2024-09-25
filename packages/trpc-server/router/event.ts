import { TRPCError } from "@trpc/server";

import {
  formSchemaBoooking,
  formSchemaEvent,
  formSchemaEventCreate,
  formSchemaEvents,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";

export const eventRoutes = router({
  events: publicProcedure.input(formSchemaEvents).query(async ({ input }) => {
    const { page, limit, date_start, date_end, order, tags, title, city } = input;
    const skip = page * limit;
  
    const where = {
      ...(date_start && date_end
        ? {
            date: {
              gte: new Date(date_start),
              lte: new Date(date_end),
            },
          }
        : {}),
      ...(tags && tags.length > 0
        ? {
            tags: {
              some: {
                name: {
                  in: tags,
                },
              },
            },
          }
        : {}),
      ...(title
        ? {
            title: {
              contains: title,
            },
          }
        : {}),
      ...(city
        ? {
            city: {
              name: {
                equals: city,
              },
            },
          }
        : {}),
    };
  
    return prisma.event.findMany({
      where,
      include: {
        tags: true,
        community: true,
        city: true,
        user: true,
      },
      orderBy: {
        date: order === "newest" ? "desc" : "asc",
      },
      skip,
      take: limit,
    });
  }),

  event: publicProcedure
    .input(formSchemaEvent)
    .query(async ({ input: { event_id } }) => {
      const event = await prisma.event.findUnique({
        where: { event_id },
        include: {
          tags: true,
          community: true,
          city: true,
          user: true,
        },
      });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Event with ID ${event_id} not found.`,
        });
      }
      return event;
    }),

  // Create a new event
  create: privateProcedure("individual", "organization")
    .input(formSchemaEventCreate)
    .mutation(
      async ({
        input: {
          title,
          description,
          date,
          city_id,
          address,
          longitude,
          latitude,
          community_id,
          uid,
          image,
          type,
          TicketPrice,
          ticketAmount,
        },
      }) => {
        // Create a new event in the database
        const newEvent = await prisma.event.create({
          data: {
            event_id: uuid(), // Generate a unique ID for the event
            title,
            description: description || null, // Allow description to be optional
            date: new Date(date), // Convert string date to Date object
            city_id, // Use provided city ID
            address: address || null, // Allow address to be optional
            longitude: longitude || null, // Allow longitude to be optional
            latitude: latitude || null, // Allow latitude to be optional
            uid: uid || null, // Allow uid to be optional
            community_id: community_id || null, // Allow community_id to be optional
            image: image || null, // Allow image to be optional
            type,
            ticketAmount: ticketAmount || 0,
            TicketPrice: TicketPrice || 0,
          },
        });

        return {
          message: "Event created successfully",
          event: newEvent,
        };
      }
    ),
    booking: privateProcedure("member")
    .input(formSchemaBoooking)
    .mutation(async ({ input }) => {
      const { ticket_id, event_id, uid, purchase_date, status } = input;
  
      // Use Prisma upsert to create or update the ticket
      const ticket = await prisma.ticket.upsert({
        where: {
          ticket_id: ticket_id || "", // Use the provided ticket_id if available
        },
        create: {
          event_id,
          uid,
          purchase_date,
          status,
        },
        update: {
          event_id,
          uid,
          purchase_date,
          status,
        },
      });
  
      return ticket;
    })
});
