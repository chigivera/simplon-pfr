"use client";

import { userFormSubscription } from "@ntla9aw/forms/src/subscription";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormSubscription();
  console.log("errors:", { errors });

  const { data: userData, status } = useSession(); // Get user data from session
  const { mutateAsync } = trpcClient.upgrade.create.useMutation();
  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  if (!userData) {
    return <div>You need to be authenticated to view this page.</div>; // Handle unauthenticated state
  }
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        try {
          // Ensure uid is set from user session
          const uid = userData?.user.uid;
          console.log(uid);
          // Call the mutateAsync function with the subscription data
          const response = await mutateAsync({
            product: data.product, // Assuming product is a field in your form
            uid,
          });

          // Redirect or show success message
          console.log("Subscription created successfully:", response);
          // Optionally redirect the user to the Stripe checkout URL
          window.location.href = response.sessionId; // Redirect to Stripe checkout
        } catch (error) {
          console.error("Error creating subscription:", error);
          // Handle error (e.g., show a notification)
        }
      })}
    >
      <div>
        <label>Choose a Subscription Plan</label>
        <select {...register("product")} required>
          <option value="">Select a plan</option>
          <option value="member">Member</option>
          <option value="individual">Individual</option>
          <option value="organization">Organization</option>
        </select>
        {errors.product && <span>{errors.product.message}</span>}
      </div>
      <br />
      <button type="submit">Subscribe</button>
    </form>
  );
}
