import { z} from 'zod'
import { AuthProviderType } from '@ntla9aw/db/types'

export const formSchemaRegister = z.object({
    email: z.string().email(),
    name:z.string().optional(),
    image: z
    .any()
    .optional(),
    password: z.string().min(6),
})


export const formSchemaUser = z.object({
    uid: z.string(),
})
export const formSchemaLogin = formSchemaRegister.pick({
    email:true,
    password:true
})


export const zodSchemaRegisterWithProvider = z.object({
    uid:z.string(),
    name:z.string(),
    image: z
    .string()
    .optional(),
    type: z.nativeEnum(AuthProviderType)

})

export const formSchemaProfile = z.object({
    uid: z.string(),
    name: z.string(),
    bio: z.string().optional(),
    avatar_url: z.string().optional(),
})

export const formSchemaCommunity = z.object({
    community_id: z.string().uuid(), // Optional for updates
})

export const formSchemaCommunityCreate = z.object({
    name: z.string().min(1, "Community name is required").max(100, "Name cannot exceed 100 characters"),
    description: z.string().max(500, "Description cannot exceed 500 characters").optional(), // Optional field
    uid: z.string().min(1, "User ID is required").optional(), // User ID must be provided
    image: z.string().optional()
});

export const formSchemaEvent = z.object({
    event_id: z.string().uuid().optional(), // Optional for updates

})
export const formEventTitle = z.object({
  title: z.string().optional(), // Optional for updates

})
export const formSchemaEvents = z.object({
  page: z.number().default(0),
  limit: z.number().default(8),
  date_start: z.string().optional(),
  date_end: z.string().optional(),
  order: z.string().default("newest"),
  tags: z.array(z.string()).optional(),
  title: z.string().optional(), // Added title
  city: z.string().optional(), // Added city
});
export const formSchemaEventCreate = z.object({
    image: z.string().optional(), // Optional for updates
    title: z.string()
      .min(1, "Event title is required")
      .max(100, "Title cannot exceed 100 characters"),
    
    description: z.string()
      .max(500, "Description cannot exceed 500 characters")
      .optional(), // Optional field
    
    date: z.string()
      .min(1, "Date is required") // Ensure the date string is not empty
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Invalid date format. Please use a valid date.",
      }),
  
    city_id: z.string() // Required city ID
      .min(1, "City ID is required"),
    
    address: z.string() // Optional address field
      .max(200, "Address cannot exceed 200 characters")
      .optional(),
    
    longitude: z.number() // Optional longitude field
      .optional(),
    
    latitude: z.number() // Optional latitude field
      .optional(),
  
    uid: z.string().uuid().optional(), // Optional for updates
    community_id: z.string().uuid().optional(), // Optional for updates
    
    ticketAmount: z.number().int().positive().optional(), // Optional ticketAmount field
    TicketPrice: z.number().positive().optional(), // Optional TicketPrice field
    type: z.enum(['FREE', 'PAID'], {
        required_error: "Event type is required",
      }), // Required event type field
  });

export const formSchemaSubscription = z.object({
    uid: z.string().optional(),
    product: z.enum(['member', 'individual', 'organization']),
  });
  
  