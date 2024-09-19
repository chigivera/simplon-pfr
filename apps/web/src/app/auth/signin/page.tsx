"use client";

import {
  DiscordOutlined,
  GithubFilled,
  GoogleOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import LoginForm from "@ntla9aw/ui/src/components/molecules/LoginForm";
import LoginLinks from "@ntla9aw/ui/src/components/molecules/LoginLinks";
const data = [
  { icon: <GoogleOutlined />, onClick: () => console.log("Clicked 1") },
  { icon: <DiscordOutlined />, onClick: () => console.log("Clicked 2") },
  { icon: <GithubFilled />, onClick: () => console.log("Clicked 3") },
  { icon: <LinkedinFilled />, onClick: () => console.log("Clicked 4") },
];

export default function Login() {
  return (
    <>
      <LoginForm title="Login" />
      <LoginLinks title="other login methods" data={data} />
    </>
  );
}
