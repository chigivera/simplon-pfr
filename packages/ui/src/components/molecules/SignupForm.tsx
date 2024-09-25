"use client";

import  { useState } from 'react';
import { Button, Input, Form } from "antd";
import { Controller } from "react-hook-form";
import { userFormRegister } from "@ntla9aw/forms/src/register";
import CustomButton from "../atoms/Button";
import { Typography } from "antd";
import { trpcClient } from "@ntla9aw/trpc-client/src/client";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import ImageUpload from '../atoms/ImageUpload';

const { Title } = Typography;




const SignupForm = ({ title }: { title: string }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = userFormRegister();
  const { mutateAsync } = trpcClient.auth.registerWithCredentials.useMutation();
const router = useRouter(); // Initialize useRouter

  const [file, setFile] = useState<File | null>(null);

  const handleLoginClick = () => {
    router.push('/auth/signin'); // Navigates to login
  };


  return (
    <>
      <Title level={2}>{title}</Title>

      <Form
        name="signup"
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
      
          } catch (error) {
            console.error("Registration error:", error);
          }
          console.log("data:", data);
          const user = await mutateAsync(data);
          console.log("user:", user);
          if (user?.user) {
            await signIn("credentials", {
              email: data.email,
              password: data.password,
              callbackUrl: "/auth/subscription",
            });
          }
        router.push('/auth/subscription');

        })}
        autoComplete="off"
      >
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field  }) => <Input {...field} placeholder="email" />}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => <Input.Password {...field} placeholder="password" />}
          />
        </Form.Item>

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

        <Form.Item  validateStatus={errors.image ? "error" : ""}>
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

        <Form.Item style={{ display: "flex", flexWrap: "nowrap", flexDirection: "column" }}>
          <CustomButton
            style={{ marginRight: 7 }}
            label="Log in"
            onClick={handleLoginClick}
          />
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignupForm;