"use client";

import { Button, Input, Form } from "antd";
import { userFormLogin } from "@ntla9aw/forms/src/login";
import { signIn } from "next-auth/react";
import CustomButton from "../atoms/Button";
import { Typography } from "antd";
const {Title} = Typography;
const LoginForm = ({title}:{title:string}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = userFormLogin();

  const onSubmit = async (data: { email: string; password: string }) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
  };

  return (
    <>
    <Title level={2}>{title}</Title>

    <Form
      name="login"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 21 }}
      style={{ maxWidth: 800 }}
      onFinish={handleSubmit(onSubmit)} // Linking React Hook Form's submit handler
      autoComplete="off"
    >
      <Form.Item
        validateStatus={errors.email ? "error" : ""}
        help={errors.email ? "Please input your email!" : ""}
      >
        <Input placeholder="email" {...register("email")} />
      </Form.Item>

      <Form.Item
        validateStatus={errors.password ? "error" : ""}
        help={errors.password ? "Please input your password!" : ""}
      >
        <Input.Password placeholder="password" {...register("password")} />
      </Form.Item>

      <Form.Item
      style={{flexWrap:'nowrap'}}
      >
        <CustomButton
          style={{ width: 130,marginRight:7 }}
          label="New Here?"
          onClick={() => {
            console.log("clicked");
          }}
        />
        <Button style={{ width: 130 }} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default LoginForm;
