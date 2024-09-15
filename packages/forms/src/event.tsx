"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaEventCreate } from "./schemas";

export type FormTypeSchema = z.infer<typeof formSchemaEventCreate>;
export const userFormEvent = () =>
  useForm<FormTypeSchema>({
    resolver: zodResolver(formSchemaEventCreate),
  });
