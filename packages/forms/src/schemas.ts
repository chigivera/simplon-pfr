import {map, z} from 'zod'
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
});