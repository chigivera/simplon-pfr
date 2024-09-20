import { TRPCError } from "@trpc/server";
import {
  formSchemaEvent,
  formSchemaEventCreate,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";

export const eventRoutes = router({
  // Fetch all events
  events: publicProcedure.query(({  }) => {
    return prisma.event.findMany();
  }),

  // Fetch a specific event by ID
  event: publicProcedure
    .input(formSchemaEvent)
    .query(async ({  input: { event_id } }) => {
      const event = await prisma.event.findUnique({ where: { event_id } });
      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Event with ID ${event_id} not found.`,
        });
      }
      return event;
    }),

  // Create a new event
  create: privateProcedure('individual',"organization").input(formSchemaEventCreate).mutation(
    async ({
      input: {
        title,
        description,
        date,
        location,
        community_id,
        uid,
      },
    }) => {
      // Create a new event in the database
      const newEvent = await prisma.event.create({
        data: {
          event_id: uuid(), // Generate a unique ID for the event
          title,
          description: description || null, // Allow description to be optional
          date,
          location,
          uid: uid || null, // Allow uid to be optional
          community_id: community_id || null, // Allow community_id to be optional
        },
      });

      return {
        message: "Event created successfully",
        event: newEvent,
      };
    }
  ),
});
