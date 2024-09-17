"use client";

import { userFormProfile } from "@ntla9aw/forms/src/profile";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormProfile();
  console.log("errors:", { errors });
  const { data: userData,status } = useSession();
  const { mutateAsync } = trpcClient.auth.createProfile.useMutation();
  const [file, setFile] = useState<File | null>(null);
  if (status === "loading") {
    return <div>Loading...</div>; // Handle loading state
  }

  if (!userData) {
    return <div>You need to be authenticated to view this page.</div>; // Handle unauthenticated state
  }
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "ml_default"); // Add your Cloudinary preset
          const uploadResponse = await fetch(
            "https://api.cloudinary.com/v1_1/dc0jqirfl/image/upload",
            {
              method: "POST",
              body: formData,
            },
          );
          const uploadData = await uploadResponse.json();
          data.avatar_url = uploadData.secure_url;
        }
        data.uid = userData?.user.uid;
        await mutateAsync(data);
      })}
    >
      <div>
        <label>Name</label>
        <input type="text" {...register("name")} />
      </div>
      <div>
        <label>Bio</label>
        <input type="text" {...register("bio")} />
      </div>
      <div>
        <label>Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            console.log("Selected file:", selectedFile);
            setFile(selectedFile);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
