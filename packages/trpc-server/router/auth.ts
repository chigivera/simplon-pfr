import { TRPCError } from "@trpc/server";
import {
  formSchemaLogin,
  formSchemaRegister,
  formSchemaUser,
  formSchemaProfile,
  zodSchemaRegisterWithProvider,
} from "@ntla9aw/forms/src/schemas";
import { privateProcedure, publicProcedure, router } from "../trpc";
import * as bcrypt from "bcryptjs";
import { prisma } from "@ntla9aw/db";
import { v4 as uuid } from "uuid";
import { AuthProviderType } from "@ntla9aw/db/types";
import { sign } from "jsonwebtoken";
export const authRoutes = router({
  users: privateProcedure("admin").query(({ ctx }) => {
    return prisma.user.findMany();
  }),
  user: privateProcedure("admin")
    .input(formSchemaUser)
    .query(({ ctx, input: { uid } }) => {
      return prisma.user.findUnique({ where: {uid} });
    }),
  signIn: publicProcedure
    .input(formSchemaLogin)
    .mutation(async ({ ctx, input: { email, password } }) => {
      const credentials = await prisma.credentials.findUnique({
        where: { email },
        include: { user: true },
      });
      if (
        !credentials ||
        !bcrypt.compareSync(password, credentials.passwordHash)
      ) {
        throw new Error("Invalid Email or Password");
      }
      const token = sign(
        {
          uid: credentials.uid,
        },
        process.env.NEXTAUTH_SECRET || ""
      );
      return {
        user: credentials.user,
        token,
      };
    }),
  registerWithCredentials: publicProcedure
    .input(formSchemaRegister)
    .mutation(async ({ input: { email, name, password, image } }) => {
      const existingUser = await prisma.credentials.findUnique({
        where: { email: email },
        include: { user: true },
      });
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
      const salt = bcrypt.genSaltSync();
      const passwordHash = bcrypt.hashSync(password, salt);
      const uid = uuid();
      const user = await prisma.user.create({
        data: {
          uid,
          name,
          Credentials: {
            create: {
              email,
              passwordHash,
            },
          },
          AuthProvider: {
            create: {
              type: AuthProviderType.CREDENTIALS,
            },
          },
        },
      });
      const role =  await prisma.member.create({
        data:{
          uid
        }
      })
      const token = sign({ uid: user.uid }, process.env.NEXTAUTH_SECRET || "");
      return { user, token };
    }),
  registerWithProvider: publicProcedure
    .input(zodSchemaRegisterWithProvider)
    .mutation(async ({ ctx, input }) => {
      const { type, uid, image, name } = input;
      const user = await prisma.user.create({
        data: {
          uid,
          name,
          image,
          AuthProvider: {
            create: {
              type: AuthProviderType.CREDENTIALS,
            },
          },
        },
      });
      const role =  await prisma.member.create({
        data:{
          uid
        }
      })
      const token = sign({uid:user.uid}, process.env.NEXTAUTH_SECRET || '')
      return {user,token}
    }),
    createProfile: privateProcedure("member")
    .input(formSchemaProfile)
    .mutation(async ({ ctx, input }) => {
      const { uid, name, bio, avatar_url } = input;

    const user = await prisma.user.findUnique({
        where: { uid },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const existingProfile = await prisma.profile.findUnique({
        where: { uid },
      });

      if (existingProfile) {
        // Update the existing profile
        const updatedProfile = await prisma.profile.update({
          where: { uid },
          data: {
            name,
            bio,
            avatar_url,
          },
        });
  
        return {
          message: "Profile updated successfully",
          profile: updatedProfile,
        };
      }

      const profile = await prisma.profile.create({
        data: {
          uid,
          name,
          bio: bio || null, // Ensure bio is not undefined
          avatar_url: avatar_url || null, // Ensure avatar_url is not undefined
        },
      });

      return {
        message: "Profile created successfully",
        profile,
      };
    }),
});
