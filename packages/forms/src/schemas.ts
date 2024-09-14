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
