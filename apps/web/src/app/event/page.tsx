"use client";

import { userFormEvent } from "@ntla9aw/forms/src/event";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Event() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormEvent();
  console.log("errors:", { errors });

  const { data: userData, status } = useSession();
  const { mutateAsync } = trpcClient.event.create.useMutation();
  const { mutateAsync: fetchCommunity } =
    trpcClient.community.owner.useMutation();

  const [communityId, setCommunityId] = useState<string | null>(null); // State to hold community ID

  // Fetch community on component mount or when userData changes
  useEffect(() => {
    const getCommunity = async () => {
      if (userData?.user.uid) {
        try {
          const community = await fetchCommunity({ uid: userData.user.uid });
          setCommunityId(community.community_id); // Set the community ID from the fetched community
        } catch (error) {
          console.error("Error fetching community:", error);
        }
      }
    };

    getCommunity();
  }, [userData, fetchCommunity]);
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
          // Set the uid from the user session
          data.uid = userData?.user.uid;
          data.community_id = communityId; // Use the fetched community ID

          // Call the mutateAsync function with the event data
          const response = await mutateAsync({
            title: data.title,
            description: data.description,
            date: data.date, // Assuming you have a start_date field
            location: data.location,
            community_id: data.community_id, // Use the community ID here
            uid: data.uid,
          });

          // Redirect or show success message
          console.log("Event created successfully:", response);
        } catch (error) {
          console.error("Error creating event:", error);
          // Handle error (e.g., show a notification)
        }
      })}
    >
      <div>
        <label>Event Title</label>
        <input placeholder="Event Title" type="text" {...register("title")} />
        {errors.title && <span>{errors.title.message}</span>}
      </div>
      <br />
      <div>
        <label>Description</label>
        <textarea placeholder="Description" {...register("description")} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <br />
      <div>
        <label>Date</label>
        <input type="datetime-local" {...register("date")} />
        {errors.date && <span>{errors.date.message}</span>}
      </div>
      <br />
      <div>
        <label>Location</label>
        <input placeholder="Location" type="text" {...register("location")} />
        {errors.location && <span>{errors.location.message}</span>}
      </div>
      <br />
      <div>
        <label>Community ID</label>
        <input
          placeholder="Community ID"
          type="text"
          value={communityId || ""} // Display the fetched community ID
          readOnly // Make it read-only if you don't want users to change it
        />
        {errors.community_id && <span>{errors.community_id.message}</span>}
      </div>
      <br />
      <button type="submit">Create Event</button>
    </form>
  );
}
