"use client"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchemaCommunityCreate } from "./schemas";

export type FormTypeCommunity = z.infer<typeof formSchemaCommunityCreate>;
export const userFormCommunity = () =>
  useForm<FormTypeCommunity>({
    resolver: zodResolver(formSchemaCommunityCreate),
  });
