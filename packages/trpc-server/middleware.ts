import { TRPCError } from "@trpc/server";
import { t } from "./trpc";
import { Role } from "./types";
import {JwtPayload, verify } from "jsonwebtoken";
import {authorizeUser } from "./utils"
export const isAuthed = (...roles: Role[]) =>
  t.middleware(async (opts:any) => {
 const { token } = opts.ctx
 if (!token) {
   throw new TRPCError({
    code:'FORBIDDEN',
    message:"Token is required"
   })
 }
 let uid
 try {
   console.log("token",token)
    const user = await verify(token, process.env.NEXTAUTH_SECRET || '')
    uid = (user as JwtPayload).uid
    console.log("Decoded UID from JWT:", uid)

   } catch (error) {
    throw new TRPCError({
        code:'FORBIDDEN',
        message:"Token is required"
       })
 }
 if(roles.length > 0) {
    await authorizeUser(uid,roles)
 }
 return opts.next({...opts,ctx : {...opts.ctx, uid}})
  });
