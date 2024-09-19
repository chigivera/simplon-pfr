import CustomButton from "../atoms/Button";
import { ReactElement } from "react";
import { Typography } from "antd";
const {Title} = Typography;
interface LoginLinkProps {
  icon: ReactElement;
  onClick: () => void;
}

interface LoginLinksProps {
  title: string
  data: LoginLinkProps[]; // Accepts an array of objects with icon and onClick properties
}

function LoginLinks({title, data }: LoginLinksProps) {
  return (
    <>
    <Title level={5}>{title}</Title>
      {data.map((item, index) => (
        <CustomButton shape={'circle'} key={index} icon={item.icon} onClick={item.onClick} style={{
            padding:25,
            marginRight:25
        }}/>
      ))}
    </>
  );
}

export default LoginLinks;
