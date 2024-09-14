"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaLogin } from "./schemas";

export type FormTypeSignIn = z.infer<typeof formSchemaLogin>;

export const userFormLogin = () => 
    useForm<FormTypeSignIn>({
        resolver: zodResolver(formSchemaLogin),
    })
