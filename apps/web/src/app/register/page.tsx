"use client";

import { userFormRegister } from "@ntla9aw/forms/src/register";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { signIn } from "next-auth/react";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormRegister();
  console.log("errors:", { errors });
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation();
  return (
    <form
      action=""
      onSubmit={handleSubmit(async (data) => {
        console.log("date:", data);
        const user = await mutateAsync(data);
        if (user?.user) {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            callbackUrl: "/",
          });
        }
        console.log("user:", user);
      })}
    >
      <input placeholder="email" type="text" {...register("email")} />
      <br />
      <input placeholder="password" type="password" {...register("password")} />
      <br />
      <input placeholder="name" type="text" {...register("name")} />
      <br />
      <input type="file" {...register("image")} />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
