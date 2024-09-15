"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaSubscription } from "./schemas";

export type FormTypeSchema = z.infer<typeof formSchemaSubscription>;
export const userFormSubscription = () =>
  useForm<FormTypeSchema>({
    resolver: zodResolver(formSchemaSubscription),
  });
