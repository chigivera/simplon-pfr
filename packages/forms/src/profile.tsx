"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaProfile } from "./schemas";

export type FormTypeProfile = z.infer<typeof formSchemaProfile>;

export const userFormProfile = () => 
    useForm<FormTypeProfile>({
        resolver: zodResolver(formSchemaProfile),
    })
