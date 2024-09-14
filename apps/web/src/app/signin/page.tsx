"use client";

import { userFormLogin } from "@ntla9aw/forms/src/login";
import { signIn } from "next-auth/react";
export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormLogin();
  console.log("errors:", { errors });
  return (
    <form
      action=""
      onSubmit={handleSubmit(async ({ email, password }) => {
        await signIn("credentials", {
          email: email,
          password: password,
          callbackUrl: "/",
        });
      })}
    >
      <input placeholder="email" type="text" {...register("email")} />
      <br />
      <input placeholder="password" type="password" {...register("password")} />
      <br />
      <button type="submit">Submit</button>
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign In with google
      </button>
    </form>
  );
}
