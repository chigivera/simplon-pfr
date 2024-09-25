"use client";

import { useState } from "react";
import { Button, Input, Form, Typography } from "antd";
import { Controller } from "react-hook-form";
import { userFormCommunity } from "@ntla9aw/forms/src/community";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageUpload from "../atoms/ImageUpload";
import TagSelector from "../atoms/TagSelector";

const { Title } = Typography;

const CommunityForm = ({ title }: { title: string }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = userFormCommunity();
  const { mutateAsync } = trpcClient.community.create.useMutation();
  const router = useRouter();
  const { data: userData } = useSession();
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Title level={2}>{title}</Title>

      <Form
        name="community"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 21 }}
        style={{ maxWidth: 800 }}
        onFinish={handleSubmit(async (data) => {
          try {
            if (file) {
              const formData = new FormData();
              formData.append("file", file);
              formData.append("upload_preset", "ml_default");
           
              const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dc0jqirfl/image/upload",
                {
                  method: "POST",
                  body: formData,
                }
              );
           
              const uploadData = await uploadResponse.json();
              data.image = uploadData.secure_url;
            }
            
            data.uid = userData?.user?.uid || "";
            
            data.tags = data.tags ? data.tags.map(tag => ({
              tag_id: tag.tag_id,
              name: tag.name
            })) : [];
      
            const community = await mutateAsync(data);
            console.log("Community created:", community);
            
            router.push('/');
          } catch (error) {
            console.error("Error creating community:", error);
          }
        })}
        autoComplete="off"
      >
        <Form.Item
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} placeholder="name" />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea allowClear {...field} placeholder="description" />
            )}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.image ? "error" : ""}>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImageUpload
                onChange={(file) => {
                  setFile(file);
                  field.onChange(file);

                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item validateStatus={errors.tags ? "error" : ""}>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TagSelector
                selectedTags={field.value || []}
                onTagChange={(tags) => field.onChange(tags)}
              />
            )}
          />
          {errors.tags && <p>{errors.tags.message}</p>}
        </Form.Item>

        <Form.Item
          style={{
            display: "flex",
            flexWrap: "nowrap",
            flexDirection: "column",
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CommunityForm;