"use client"
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import SignupForm from "@ntla9aw/ui/src/components/molecules/SignupForm";
import SubscriptionForm from "@ntla9aw/ui/src/components/molecules/SubscriptionForm";
import { Space } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Settings() {
  const { data: userData } = useSession();
  const router = useRouter();
  const { mutateAsync } = trpcClient.upgrade.create.useMutation();

  const subscriptions = [
    {
      title: "Free", // Ensure it is "Free"
      terms: ["Term 1", "Term 2"],
      price: "Free",
      onClick: async () => handleSubscription("member"),
    },
    {
      title: "Individual",
      terms: ["Term 1", "Term 2"],
      price: "$10",
      onClick: async () => handleSubscription("individual"),
    },
    {
      title: "Organization",
      terms: ["Term 1", "Term 2"],
      price: "$25",
      onClick: async () => handleSubscription("organization"),
    },
  ];

  const handleSubscription = async (
    product: "member" | "individual" | "organization",
  ) => {
    if (!userData?.user?.uid) return; // Ensure uid is available
    if (product === "member") {
      router.push("/auth/preferences");
    }
    try {
      const response = await mutateAsync({ product, uid: userData.user.uid });
      if (response?.sessionId) {
        // Only redirect if sessionId is valid
        window.location.href = response.sessionId;
      } else {
        throw new Error("No sessionId returned");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to subscribe. Please try again later.");
    }
  };

  return (
    <Space
      style={{
        background: "white",
        width: "100%",
        padding: "1em",
      }}
      direction="vertical"
    >
      <SignupForm title={"Profile Settings"} />
      <SubscriptionForm data={subscriptions} />    </Space>
  );
}
