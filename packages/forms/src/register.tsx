"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaRegister } from "./schemas";

export type FormTypeSchema = z.infer<typeof formSchemaRegister>;
export const userFormRegister = () =>
  useForm<FormTypeSchema>({
    resolver: zodResolver(formSchemaRegister),
  });
